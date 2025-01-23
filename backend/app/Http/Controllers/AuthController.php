<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Barrio;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Spatie\Permission\Models\Role;

class AuthController extends Controller
{
    // Verificar el token de acceso
    public function verifyToken(Request $request)
    {
        if (Auth::check()) {
            return response()->json(['message' => 'Token is valid'], 200);
        } else {
            return response()->json(['message' => 'Token is invalid'], 401);
        }
    }

    // Función de login
        public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
            'role' => 'required|string|in:super_admin,admin,user,admin_general'
        ]);
    
        $user = User::where('email', $credentials['email'])->first();
        if (!$user || !Hash::check($credentials['password'], $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }
    
        // Verificar si el usuario tiene el rol especificado
        $role = Role::findByName($credentials['role']);
        if (!$user->hasRole($role)) {
            return response()->json(['message' => 'Invalid role'], 401);
        }
    
        // Obtener el barrio administrado por defecto
        $barrioAdmin = $user->barriosAdministrados()->where('default', true)->first();
        $barrio = $barrioAdmin ? Barrio::find($barrioAdmin->pivot->barrio_id) : null;
    
        // Generar un token de acceso
        $token = $user->createToken('auth_token')->plainTextToken;
    
        // Cargar las relaciones necesarias del usuario
        $user->load(['barriosAdministrados', 'barriosEmpleado', 'persona']);
    
        return response()->json([
            'access_token' => $token,
            'api_token' => $token,
            'token_type' => 'Bearer',
            'barrio' => $barrio,
            'user' => $user // Devolver el usuario completo con sus relaciones
        ]);
    }
}