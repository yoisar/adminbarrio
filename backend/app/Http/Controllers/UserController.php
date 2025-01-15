<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Persona;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    // Listar todos los usuarios
    public function index()
    {
        $users = User::with('persona')->get();
        return response()->json($users);
    }

    // Mostrar un usuario específico
    public function show($id)
    {
        $user = User::with('persona')->findOrFail($id);
        return response()->json($user);
    }

    // Crear un nuevo usuario
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'role' => 'required|string|in:' . implode(',', User::ROLES),
            'telefono' => 'nullable|string|max:255',
            'direccion' => 'nullable|string|max:255',
            'nombre' => 'required|string|max:255',
            'apellido' => 'required|string|max:255',
        ]);

        $user = User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => Hash::make($validatedData['password']),
            'role' => $validatedData['role'],
            'telefono' => $validatedData['telefono'],
            'direccion' => $validatedData['direccion'],
        ]);

        $persona = Persona::create([
            'nombre' => $validatedData['nombre'],
            'apellido' => $validatedData['apellido'],
            'telefono' => $validatedData['telefono'],
            'direccion' => $validatedData['direccion'],
            'user_id' => $user->id,
        ]);

        return response()->json($user->load('persona'), 201);
    }

    // Actualizar un usuario existente
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:8',
            'role' => 'required|string|in:' . implode(',', User::ROLES),
            'telefono' => 'nullable|string|max:255',
            'direccion' => 'nullable|string|max:255',
            'nombre' => 'required|string|max:255',
            'apellido' => 'required|string|max:255',
        ]);

        $user->update([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => $validatedData['password'] ? Hash::make($validatedData['password']) : $user->password,
            'role' => $validatedData['role'],
            'telefono' => $validatedData['telefono'],
            'direccion' => $validatedData['direccion'],
        ]);

        $user->persona->update([
            'nombre' => $validatedData['nombre'],
            'apellido' => $validatedData['apellido'],
            'telefono' => $validatedData['telefono'],
            'direccion' => $validatedData['direccion'],
        ]);

        return response()->json($user->load('persona'));
    }

    // Eliminar un usuario
    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return response()->json(null, 204);
    }

    // Listar usuarios con rol 'user'
    public function listUsers()
    {
        $users = User::where('role', 'user')->get();
        return response()->json($users);
    }

    // Contar usuarios con rol 'user'
    public function countUsers()
    {
        $count = User::where('role','=', 'user')->count();
        return response()->json(['count' => $count]);
    }
}