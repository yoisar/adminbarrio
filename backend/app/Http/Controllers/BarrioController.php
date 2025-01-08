<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBarrioRequest;
use App\Http\Requests\UpdateBarrioRequest;
use App\Models\Barrio;
use Illuminate\Http\Request;

class BarrioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $barrios = Barrio::all();
        return response()->json($barrios);
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
    public function store(StoreBarrioRequest $request)
    {
        $barrio = Barrio::create($request->validated());
        return response()->json($barrio, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Barrio $barrio)
    {
        return response()->json($barrio);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Barrio $barrio)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBarrioRequest $request, Barrio $barrio)
    {
        $barrio->update($request->validated());
        return response()->json($barrio);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Barrio $barrio)
    {
        $barrio->delete();
        return response()->json(null, 204);
    }
}
