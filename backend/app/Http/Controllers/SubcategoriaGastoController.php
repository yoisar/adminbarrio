<?php

namespace App\Http\Controllers;

use App\Models\SubcategoriaGasto;
use Illuminate\Http\Request;

class SubcategoriaGastoController extends Controller
{
    public function index()
    {
        $subcategorias = SubcategoriaGasto::with('categoria')->get();
        return response()->json($subcategorias);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'categoria_gasto_id' => 'required|exists:categoria_gastos,id',
            'nombre' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
        ]);

        $subcategoria = SubcategoriaGasto::create($validatedData);
        return response()->json($subcategoria, 201);
    }

    public function show($id)
    {
        $subcategoria = SubcategoriaGasto::with('categoria')->findOrFail($id);
        return response()->json($subcategoria);
    }

    public function update(Request $request, $id)
    {
        $subcategoria = SubcategoriaGasto::findOrFail($id);

        $validatedData = $request->validate([
            'categoria_gasto_id' => 'required|exists:categoria_gastos,id',
            'nombre' => 'sometimes|required|string|max:255',
            'descripcion' => 'nullable|string',
        ]);

        $subcategoria->update($validatedData);
        return response()->json($subcategoria);
    }

    public function destroy($id)
    {
        SubcategoriaGasto::destroy($id);
        return response()->json(null, 204);
    }
}