<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Proveedor;

class ProveedorController extends Controller
{
    // Listar todos los proveedores
    public function index()
    {
        $proveedores = Proveedor::all();
        return response()->json($proveedores);
    }

    // Crear un nuevo proveedor
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'nombre' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
        ]);

        $proveedor = Proveedor::create($validatedData);
        return response()->json($proveedor, 201);
    }

    // Mostrar un proveedor específico
    public function show($id)
    {
        $proveedor = Proveedor::findOrFail($id);
        return response()->json($proveedor);
    }

    // Actualizar un proveedor
    public function update(Request $request, $id)
    {
        $proveedor = Proveedor::findOrFail($id);

        $validatedData = $request->validate([
            'nombre' => 'sometimes|required|string|max:255',
            'descripcion' => 'nullable|string',
        ]);

        $proveedor->update($validatedData);
        return response()->json($proveedor);
    }

    // Eliminar un proveedor
    public function destroy($id)
    {
        Proveedor::destroy($id);
        return response()->json(null, 204);
    }
}