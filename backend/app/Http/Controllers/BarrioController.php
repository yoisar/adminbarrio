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

    // Otras funciones del controlador...
}
