<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Gasto;

class GastosController extends Controller
{
    // Listar todos los gastos
    public function index()
    {
        $gastos = Gasto::all();
        return response()->json($gastos);
    }

    // Crear un nuevo gasto
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'descripcion' => 'required|string|max:255',
            'monto' => 'required|numeric',
            'tipo' => 'required|in:fijo,variable,extraordinario',
            'fecha' => 'required|date',
        ]);

        $gasto = Gasto::create($validatedData);
        return response()->json($gasto, 201);
    }

    // Mostrar un gasto específico
    public function show($id)
    {
        $gasto = Gasto::findOrFail($id);
        return response()->json($gasto);
    }

    // Actualizar un gasto
    public function update(Request $request, $id)
    {
        $gasto = Gasto::findOrFail($id);

        $validatedData = $request->validate([
            'descripcion' => 'sometimes|required|string|max:255',
            'monto' => 'sometimes|required|numeric',
            'tipo' => 'sometimes|required|in:fijo,variable,extraordinario',
            'fecha' => 'sometimes|required|date',
        ]);

        $gasto->update($validatedData);
        return response()->json($gasto);
    }

    // Eliminar un gasto
    public function destroy($id)
    {
        Gasto::destroy($id);
        return response()->json(null, 204);
    }
}