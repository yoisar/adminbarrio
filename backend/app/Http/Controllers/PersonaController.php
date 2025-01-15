<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePersonaRequest;
use App\Http\Requests\UpdatePersonaRequest;
use App\Models\Persona;
use App\Models\User;
use Illuminate\Http\Request;

class PersonaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePersonaRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Persona $persona)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Persona $persona)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePersonaRequest $request, Persona $persona)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Persona $persona)
    {
        //
    }

    /**
     * Obtener la lista de propietarios.
     */
    public function fetchPropietarios()
    {
        $propietarios = User::where('role', 'propietario')->with('persona')->get()->map(function ($user) {
            return [
                'id' => $user->id,
                'nombre' => $user->persona ? $user->persona->nombre : $user->name,
                'apellidos' => $user->persona ? $user->persona->apellido : $user->surname,
            ];
        });
        return response()->json($propietarios);
    }

    /**
     * Obtener la lista de inquilinos.
     */
    public function fetchInquilinos()
    {
        $inquilinos = User::where('role', 'inquilino')->with('persona')->get()->map(function ($user) {
            return [
                'id' => $user->id,
                'nombre' => $user->persona ? $user->persona->nombre : $user->name,
                'apellidos' => $user->persona ? $user->persona->apellido : $user->surname,
            ];
        });
        return response()->json($inquilinos);
    }
}
