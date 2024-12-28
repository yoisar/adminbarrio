<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\GastosController;
use App\Http\Controllers\ExpensasController;
use App\Http\Controllers\CobrosController;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::middleware('api')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index']);
    Route::apiResource('gastos', GastosController::class);
    Route::apiResource('expensas', ExpensasController::class);
    Route::apiResource('cobros', CobrosController::class);

    // Endpoint adicional para morosos
    Route::get('/cobros/morosos', [CobrosController::class, 'morosos']);
});