<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Gasto;

class GastosController extends Controller
{
    // Listar todos los gastos
    public function index()
    {
        $gastos = Gasto::with(['barrio', 'subcategoria','subcategoria.categoria'])->get();

        // Modificar la colección para incluir los nombres del barrio y de la subcategoría de gasto
        $gastos = $gastos->map(function ($gasto) {
            return [
                'id' => $gasto->id,
                'subcategoria_gasto_id' => $gasto->subcategoria_gasto_id,
                'barrio_id' => $gasto->barrio_id,
                'descripcion' => $gasto->descripcion,
                'barrio' => $gasto->barrio ? $gasto->barrio->nombre : null,
                'monto' => $gasto->monto,
                'fecha' => $gasto->fecha,
                'created_at' => $gasto->created_at,
                'updated_at' => $gasto->updated_at,
                'subcategoria' => $gasto->subcategoria ? $gasto->subcategoria->nombre : null,
                'categoria'=> $gasto->subcategoria ? $gasto->subcategoria->categoria->nombre : null,
                'categoriaYSubcateogria'=> $gasto->subcategoria ? $gasto->subcategoria->categoria->nombre . ' - ' . $gasto->subcategoria->nombre : null,
            ];
        });

        return response()->json($gastos);
    }

    // Crear un nuevo gasto
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'subcategoria_gasto_id' => 'required|exists:subcategoria_gastos,id',
            'barrio_id' => 'required|exists:barrios,id',
            'descripcion' => 'required|string|max:255',
            'monto' => 'required|numeric',
            'fecha' => 'required|date',
        ]);

        $gasto = Gasto::create($validatedData);
        return response()->json($gasto, 201);
    }

    // Mostrar un gasto específico
    public function show($id)
    {
        $gasto = Gasto::with('subcategoria')->findOrFail($id);
        return response()->json($gasto);
    }

    // Actualizar un gasto
    public function update(Request $request, $id)
    {
        $gasto = Gasto::findOrFail($id);

        $validatedData = $request->validate([
            'subcategoria_gasto_id' => 'sometimes|required|exists:subcategoria_gastos,id',
            'barrio_id' => 'sometimes|required|exists:barrios,id',
            'descripcion' => 'sometimes|required|string|max:255',
            'monto' => 'sometimes|required|numeric',
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