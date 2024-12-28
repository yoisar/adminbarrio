<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cobro;
use App\Models\User;
use App\Models\Expensa;

class CobrosController extends Controller
{
    // Listar todos los cobros
    public function index()
    {
        $cobros = Cobro::with(['user', 'expensa'])->get();
        return response()->json($cobros);
    }

    // Registrar un nuevo cobro
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'user_id' => 'required|exists:users,id',
            'expensa_id' => 'required|exists:expensas,id',
            'monto_pagado' => 'required|numeric',
            'fecha_pago' => 'required|date',
        ]);

        $cobro = Cobro::create($validatedData);
        return response()->json($cobro, 201);
    }

    // Mostrar un cobro específico
    public function show($id)
    {
        $cobro = Cobro::with(['user', 'expensa'])->findOrFail($id);
        return response()->json($cobro);
    }

    // Eliminar un cobro
    public function destroy($id)
    {
        Cobro::destroy($id);
        return response()->json(null, 204);
    }

    // Listar usuarios morosos
        // Listar usuarios morosos
    public function morosos()
    {
        $morosos = User::whereDoesntHave('cobros')->get();
    
        if ($morosos->isEmpty()) {
            return response()->json(['message' => 'No se encontraron usuarios morosos'], 404);
        }
    
        return response()->json($morosos);
    }
}