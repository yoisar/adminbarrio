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

    // Crear una nueva expensa
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'monto_total' => 'required|numeric',
            'fecha' => 'required|date',
            'detalle' => 'required|string|max:255',
        ]);

        $expensa = Expensa::create($validatedData);
        return response()->json($expensa, 201);
    }

    // Mostrar una expensa específica
    public function show($id)
    {
        $expensa = Expensa::findOrFail($id);
        return response()->json($expensa);
    }

    // Actualizar una expensa
    public function update(Request $request, $id)
    {
        $expensa = Expensa::findOrFail($id);

        $validatedData = $request->validate([
            'monto_total' => 'sometimes|required|numeric',
            'fecha' => 'sometimes|required|date',
            'detalle' => 'sometimes|required|string|max:255',
        ]);

        $expensa->update($validatedData);
        return response()->json($expensa);
    }

    // Eliminar una expensa
    public function destroy($id)
    {
        Expensa::destroy($id);
        return response()->json(null, 204);
    }
}