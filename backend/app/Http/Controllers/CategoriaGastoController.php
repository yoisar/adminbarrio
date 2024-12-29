<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CategoriaGasto;

class CategoriaGastoController extends Controller
{
    // Listar todas las categorías de gastos
    public function index()
    {
        $categorias = CategoriaGasto::all();
        return response()->json($categorias);
    }

    // Mostrar una categoría específica
    public function show($id)
    {
        $categoria = CategoriaGasto::findOrFail($id);
        return response()->json($categoria);
    }

    // Crear una nueva categoría
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'nombre' => 'required|string|max:255',
        ]);

        $categoria = CategoriaGasto::create($validatedData);
        return response()->json($categoria, 201);
    }

    // Actualizar una categoría
    public function update(Request $request, $id)
    {
        $categoria = CategoriaGasto::findOrFail($id);

        $validatedData = $request->validate([
            'nombre' => 'sometimes|required|string|max:255',
        ]);

        $categoria->update($validatedData);
        return response()->json($categoria);
    }

    // Eliminar una categoría
    public function destroy($id)
    {
        CategoriaGasto::destroy($id);
        return response()->json(null, 204);
    }
}