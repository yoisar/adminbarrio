<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cobro;

class CobrosController extends Controller
{
    // Listar todos los cobros
    public function index()
    {
        $cobros = Cobro::all();
        return response()->json($cobros);
    }

    // Mostrar un cobro específico
    public function show($id)
    {
        $cobro = Cobro::findOrFail($id);
        return response()->json($cobro);
    }

    // Crear un nuevo cobro
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'monto' => 'required|numeric',
            'fecha' => 'required|date',
            'detalle' => 'required|string|max:255',
        ]);

        $cobro = Cobro::create($validatedData);
        return response()->json($cobro, 201);
    }

    // Actualizar un cobro
    public function update(Request $request, $id)
    {
        $cobro = Cobro::findOrFail($id);

        $validatedData = $request->validate([
            'monto' => 'sometimes|required|numeric',
            'fecha' => 'sometimes|required|date',
            'detalle' => 'sometimes|required|string|max:255',
        ]);

        $cobro->update($validatedData);
        return response()->json($cobro);
    }

    // Eliminar un cobro
    public function destroy($id)
    {
        Cobro::destroy($id);
        return response()->json(null, 204);
    }

    // Obtener el total de cobros
    public function getTotalCobros()
    {
        try {
            $totalCobros = Cobro::sum('monto_pagado');
            return response()->json(['total' => $totalCobros]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error fetching total cobros: ' . $e->getMessage()], 500);
        }
    }

    // Obtener los cobros morosos
    public function morosos()
    {
        // Lógica para obtener los cobros morosos
    }
}