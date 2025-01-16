<?php

namespace App\Http\Controllers;

use App\Models\CategoriaGasto;
use App\Models\SubcategoriaGasto;
use Illuminate\Http\Request;

class CategoriaGastoController extends Controller
{
    public function index()
    {
        $categorias = CategoriaGasto::with('subcategorias')->get();
        return response()->json($categorias);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'nombre' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
        ]);

        $categoria = CategoriaGasto::create($validatedData);
        return response()->json($categoria, 201);
    }

    public function show($id)
    {
        $categoria = CategoriaGasto::with('subcategorias')->findOrFail($id);
        return response()->json($categoria);
    }

    public function update(Request $request, $id)
    {
        $categoria = CategoriaGasto::findOrFail($id);

        $validatedData = $request->validate([
            'nombre' => 'sometimes|required|string|max:255',
            'descripcion' => 'nullable|string',
        ]);

        $categoria->update($validatedData);
        return response()->json($categoria);
    }

    public function destroy($id)
    {
        CategoriaGasto::destroy($id);
        return response()->json(null, 204);
    }

    public function storeSubcategoria(Request $request, $categoriaId)
    {
        $validatedData = $request->validate([
            'nombre' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
        ]);

        $subcategoria = SubcategoriaGasto::create([
            'categoria_gasto_id' => $categoriaId,
            ...$validatedData,
        ]);

        return response()->json($subcategoria, 201);
    }
}