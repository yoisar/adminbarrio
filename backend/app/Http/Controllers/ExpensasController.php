<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Expensa;

class ExpensasController extends Controller
{
    // Listar todas las expensas
    public function index()
    {
        $expensas = Expensa::all();
        return response()->json($expensas);
    }

    // Mostrar una expensa específica
    public function show($id)
    {
        $expensa = Expensa::findOrFail($id);
        return response()->json($expensa);
    }

    // Crear una nueva expensa
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'fecha_vencimiento' => 'required|date',
            'total' => 'required|numeric',
            'saldo_anterior' => 'required|numeric',
            'monto_pagado' => 'required|numeric',
        ]);

        $expensa = Expensa::create($validatedData);
        return response()->json($expensa, 201);
    }

    // Actualizar una expensa existente
    public function update(Request $request, $id)
    {
        $expensa = Expensa::findOrFail($id);

        $validatedData = $request->validate([
            'fecha_vencimiento' => 'sometimes|required|date',
            'total' => 'sometimes|required|numeric',
            'saldo_anterior' => 'sometimes|required|numeric',
            'monto_pagado' => 'sometimes|required|numeric',
        ]);

        $expensa->update($validatedData);
        return response()->json($expensa);
    }

    // Eliminar una expensa existente
    public function destroy($id)
    {
        Expensa::destroy($id);
        return response()->json(null, 204);
    }

    // Obtener el total de expensas
    public function getTotalExpensas()
    {
        try {
            $totalExpensas = Expensa::sum('total');
            return response()->json(['total' => $totalExpensas]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error fetching total expensas: ' . $e->getMessage()], 500);
        }
    }
}
