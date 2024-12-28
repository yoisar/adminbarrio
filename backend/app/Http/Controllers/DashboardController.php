<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Gasto;
use App\Models\Expensa;
use App\Models\Cobro;
use App\Models\User;

class DashboardController extends Controller
{
    public function index()
    {
        // Obtener el total de gastos
        $totalGastos = Gasto::sum('monto');

        // Obtener el total de expensas
        $totalExpensas = Expensa::sum('monto_total');

        // Obtener el total de cobros
        $totalCobros = Cobro::sum('monto_pagado');

        // Contar los usuarios morosos (usuarios sin cobros registrados)
        $morosos = User::whereDoesntHave('cobros')->count();

        // Retornar métricas al cliente
        return response()->json([
            'total_gastos' => $totalGastos,
            'total_expensas' => $totalExpensas,
            'morosos' => $morosos,
            'total_cobros' => $totalCobros,
        ]);
    }
}
