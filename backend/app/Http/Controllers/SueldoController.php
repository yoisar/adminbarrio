<?php

namespace App\Http\Controllers;

use App\Models\Sueldo;
use Illuminate\Http\Request;

class SueldoController extends Controller
{
    public function index()
    {
        $sueldos = Sueldo::all();
        return response()->json($sueldos);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'user_id' => 'required|exists:users,id',
            'monto' => 'required|numeric',
            'fecha' => 'required|date',
        ]);

        $sueldo = Sueldo::create($validatedData);
        return response()->json($sueldo, 201);
    }

    public function show($id)
    {
        $sueldo = Sueldo::findOrFail($id);
        return response()->json($sueldo);
    }

    public function update(Request $request, $id)
    {
        $sueldo = Sueldo::findOrFail($id);

        $validatedData = $request->validate([
            'user_id' => 'sometimes|exists:users,id',
            'monto' => 'sometimes|numeric',
            'fecha' => 'sometimes|date',
        ]);

        $sueldo->update($validatedData);
        return response()->json($sueldo);
    }

    public function destroy($id)
    {
        $sueldo = Sueldo::findOrFail($id);
        $sueldo->delete();
        return response()->json(null, 204);
    }
}
