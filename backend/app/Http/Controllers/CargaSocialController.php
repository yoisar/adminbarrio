<?php

namespace App\Http\Controllers;

use App\Models\CargaSocial;
use Illuminate\Http\Request;

class CargaSocialController extends Controller
{
    public function index()
    {
        $cargasSociales = CargaSocial::all();
        return response()->json($cargasSociales);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'sueldo_id' => 'required|exists:sueldos,id',
            'monto' => 'required|numeric',
            'descripcion' => 'required|string',
        ]);

        $cargaSocial = CargaSocial::create($validatedData);
        return response()->json($cargaSocial, 201);
    }

    public function show($id)
    {
        $cargaSocial = CargaSocial::findOrFail($id);
        return response()->json($cargaSocial);
    }

    public function update(Request $request, $id)
    {
        $cargaSocial = CargaSocial::findOrFail($id);

        $validatedData = $request->validate([
            'sueldo_id' => 'sometimes|exists:sueldos,id',
            'monto' => 'sometimes|numeric',
            'descripcion' => 'sometimes|string',
        ]);

        $cargaSocial->update($validatedData);
        return response()->json($cargaSocial);
    }

    public function destroy($id)
    {
        $cargaSocial = CargaSocial::findOrFail($id);
        $cargaSocial->delete();
        return response()->json(null, 204);
    }
}
