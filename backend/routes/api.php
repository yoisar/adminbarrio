<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\{
    DashboardController,
    GastosController,
    ExpensasController,
    CobrosController,
    UserController,
    UserProfileController,
    CategoriaGastoController,
    AuthController,
    SueldoController,
    CargaSocialController,
    ConceptoController,
    BarrioController // Importar el controlador de Barrios
};
use App\Models\User;
use Illuminate\Support\Facades\Hash;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Aquí es donde puedes registrar las rutas API para tu aplicación. Estas
| rutas son cargadas por el RouteServiceProvider dentro de un grupo que
| contiene el grupo de middleware "api". ¡Disfruta construyendo tu API!
|
*/

// Rutas públicas de la API
Route::middleware('api')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index']);
    Route::apiResource('gastos', GastosController::class);
    Route::apiResource('expensas', ExpensasController::class);
    Route::apiResource('cobros', CobrosController::class);
    Route::apiResource('categorias', CategoriaGastoController::class);
    Route::get('/cobros/morosos', [CobrosController::class, 'morosos']);
    Route::get('/users/role/user', [UserController::class, 'listUsers']); // Endpoint para listar usuarios con rol 'user'
    Route::post('/login', [AuthController::class, 'login']); // Endpoint para login
    Route::post('/verify_token', [AuthController::class, 'verifyToken'])->middleware('auth:sanctum');
    Route::apiResource('sueldos', SueldoController::class);
    Route::apiResource('cargas-sociales', CargaSocialController::class);
    Route::apiResource('conceptos', ConceptoController::class);
    Route::apiResource('barrios', BarrioController::class); // Endpoint resource para Barrios
});

// Rutas protegidas por autenticación con Sanctum
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Rutas para el perfil de usuario
    Route::get('/profile', [UserProfileController::class, 'show']);
    Route::put('/profile', [UserProfileController::class, 'update']);
    Route::put('/profile/change-password', [UserProfileController::class, 'changePassword']);
});

// Rutas protegidas para super administradores
Route::middleware(['auth:sanctum', 'role:super_admin'])->group(function () {
    Route::get('/admin/dashboard', [DashboardController::class, 'index']);
});

// Rutas protegidas para administradores
Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::get('/users', [UserController::class, 'index']);
    Route::post('/users', [UserController::class, 'store']);
    Route::get('/users/{id}', [UserController::class, 'show']);
    Route::put('/users/{id}', [UserController::class, 'update']);
    Route::delete('/users/{id}', [UserController::class, 'destroy']);
    Route::get('/users/count', [UserController::class, 'countUsers']); // Nuevo endpoint para contar usuarios
});