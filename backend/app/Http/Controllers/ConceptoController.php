<?php

namespace App\Http\Controllers;

use App\Models\Concepto;
use Illuminate\Http\Request;

class ConceptoController extends Controller
{
    public function index()
    {
        $conceptos = Concepto::all();
        return response()->json($conceptos);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'sueldo_id' => 'required|exists:sueldos,id',
            'carga_social_id' => 'nullable|exists:cargas_sociales,id',
            'nombre' => 'required|string',
            'monto' => 'required|numeric',
        ]);

        $concepto = Concepto::create($validatedData);
        return response()->json($concepto, 201);
    }

    public function show($id)
    {
        $concepto = Concepto::findOrFail($id);
        return response()->json($concepto);
    }

    public function update(Request $request, $id)
    {
        $concepto = Concepto::findOrFail($id);

        $validatedData = $request->validate([
            'sueldo_id' => 'sometimes|exists:sueldos,id',
            'carga_social_id' => 'nullable|exists:cargas_sociales,id',
            'nombre' => 'sometimes|string',
            'monto' => 'sometimes|numeric',
        ]);

        $concepto->update($validatedData);
        return response()->json($concepto);
    }

    public function destroy($id)
    {
        $concepto = Concepto::findOrFail($id);
        $concepto->delete();
        return response()->json(null, 204);
    }
}
