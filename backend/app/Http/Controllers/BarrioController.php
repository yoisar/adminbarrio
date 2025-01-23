<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBarrioRequest;
use App\Http\Requests\UpdateBarrioRequest;
use App\Models\Barrio;
use App\Models\BarrioAdmin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
     * Display a listing of the barrios administrados by the current user.
     */
    public function getBarriosByAdmin(Request $request)
    {
        $userId = $request->query('user_id');
        $barrios = BarrioAdmin::where('user_id', $userId)->with('barrio')->get()->pluck('barrio');

        if ($barrios->isEmpty()) {
            return response()->json(['message' => 'No barrios found for the specified user'], 404);
        }

        return response()->json($barrios);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $barrio = Barrio::find($id);

        if (!$barrio) {
            return response()->json(['message' => 'Barrio not found'], 404);
        }

        return response()->json($barrio);
    }

    /**
     * Display the barrios administrados by the specified user.
     */
    public function showByUser($userId)
    {
        $barrios = BarrioAdmin::where('user_id', $userId)->with('barrio')->get()->pluck('barrio');

        if ($barrios->isEmpty()) {
            return response()->json(['message' => 'No barrios found for the specified user'], 404);
        }

        return response()->json($barrios);
    }
}
