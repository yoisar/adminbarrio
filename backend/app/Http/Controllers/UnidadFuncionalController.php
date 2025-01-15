<?php

namespace App\Http\Controllers;

use App\Models\UnidadFuncional;
use Illuminate\Http\Request;

class UnidadFuncionalController extends Controller
{
    public function index()
    {
        $unidadesFuncionales = UnidadFuncional::with(['barrio', 'propietario.persona', 'inquilino.persona'])->get();

        // Modificar la colección para incluir los nombres del propietario y del inquilino
        $unidadesFuncionales = $unidadesFuncionales->map(function ($unidad) {
            return [
                'id' => $unidad->id,
                'nombre' => $unidad->nombre,
                'numero' => $unidad->numero,
                'saldo_actual' => $unidad->saldo_actual,
                'barrio' => $unidad->barrio->nombre,
                'propietario' => $unidad->propietario ? ($unidad->propietario->persona ? $unidad->propietario->persona->nombre . ' ' . $unidad->propietario->persona->apellido : $unidad->propietario->name) : null,
                'inquilino' => $unidad->inquilino ? ($unidad->inquilino->persona ? $unidad->inquilino->persona->nombre . ' ' . $unidad->inquilino->persona->apellido : $unidad->inquilino->name) : null,
                'barrio_id' => $unidad->barrio->id,
                'propietario_id' => $unidad->propietario ? $unidad->propietario->id : null,
                'inquilino_id' => $unidad->inquilino ? $unidad->inquilino->id : null,
                'created_at' => $unidad->created_at,
                'updated_at' => $unidad->updated_at,
            ];
        });

        return response()->json($unidadesFuncionales);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'barrio_id' => 'required|exists:barrios,id',
            'propietario_id' => 'required|exists:users,id',
            'inquilino_id' => 'nullable|exists:users,id',
            'numero' => 'required|string|max:255',
            'saldo_actual' => 'required|numeric',
            'estado' => 'required|string|max:255',
        ]);

        $unidadFuncional = UnidadFuncional::create($validatedData);
        return response()->json($unidadFuncional, 201);
    }

    public function show($id)
    {
        $unidadFuncional = UnidadFuncional::with(['barrio', 'propietario', 'inquilino'])->findOrFail($id);
        return response()->json($unidadFuncional);
    }

    public function update(Request $request, $id)
    {
        $unidadFuncional = UnidadFuncional::findOrFail($id);

        $validatedData = $request->validate([
            'barrio_id' => 'required|exists:barrios,id',
            'propietario_id' => 'required|exists:users,id',
            'inquilino_id' => 'nullable|exists:users,id',
            'numero' => 'required|string|max:255',
            'saldo_actual' => 'required|numeric',
            'estado' => 'required|string|max:255',
        ]);

        $unidadFuncional->update($validatedData);
        return response()->json($unidadFuncional);
    }

    public function destroy($id)
    {
        $unidadFuncional = UnidadFuncional::findOrFail($id);
        $unidadFuncional->delete();
        return response()->json(null, 204);
    }
}