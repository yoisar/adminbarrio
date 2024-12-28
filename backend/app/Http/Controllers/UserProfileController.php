<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class UserProfileController extends Controller
{
    // Obtener el perfil del usuario autenticado
    public function show(Request $request)
    {
        return response()->json($request->user());
    }

    // Actualizar información del perfil
    public function update(Request $request)
    {
        $user = $request->user();

        $validatedData = $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|max:255|unique:users,email,' . $user->id,
        ]);

        $user->update($validatedData);

        return response()->json(['message' => 'Perfil actualizado con éxito', 'user' => $user]);
    }

    // Cambiar la contraseña del usuario
    public function changePassword(Request $request)
    {
        $validatedData = $request->validate([
            'current_password' => 'required',
            'new_password' => 'required|string|min:6|confirmed',
        ]);

        $user = $request->user();

        // Verificar si la contraseña actual es correcta
        if (!Hash::check($validatedData['current_password'], $user->password)) {
            throw ValidationException::withMessages([
                'current_password' => ['La contraseña actual no es correcta.'],
            ]);
        }

        // Actualizar la contraseña
        $user->update([
            'password' => Hash::make($validatedData['new_password']),
        ]);

        return response()->json(['message' => 'Contraseña actualizada con éxito']);
    }
}