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
    SubcategoriaGastoController, // Importar el controlador de Subcategorias de Gastos
    AuthController,
    SueldoController,
    CargaSocialController,
    ConceptoController,
    BarrioController,
    UnidadFuncionalController, // Importar el controlador de Unidades Funcionales
    ProveedorController // Importar el controlador de Proveedores
};

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
    Route::get('/gastos/barrio/{barrio_id}', [GastosController::class, 'getGastosByBarrio']); // Endpoint para obtener gastos por barrio
    Route::apiResource('expensas', ExpensasController::class);
    Route::apiResource('cobros', CobrosController::class);
    Route::apiResource('categorias', CategoriaGastoController::class);
    Route::apiResource('subcategorias', SubcategoriaGastoController::class); // Endpoint resource para Subcategorias de Gastos
    Route::apiResource('proveedores', ProveedorController::class); // Endpoint resource para Proveedores
    Route::get('/cobros/morosos', [CobrosController::class, 'morosos']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/verify_token', [AuthController::class, 'verifyToken'])->middleware('auth:sanctum');
    Route::apiResource('sueldos', SueldoController::class);
    Route::apiResource('cargas-sociales', CargaSocialController::class);
    Route::apiResource('conceptos', ConceptoController::class);
    Route::apiResource('barrios', BarrioController::class);
    Route::apiResource('unidades-funcionales', UnidadFuncionalController::class); // Endpoint resource para Unidades Funcionales
});

// Rutas protegidas por autenticación con Sanctum
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Rutas para el perfil de usuario
    Route::put('/profile', [UserProfileController::class, 'update']);
    Route::get('/profile', [UserProfileController::class, 'show']);
    Route::put('/profile/change-password', [UserProfileController::class, 'changePassword']);
});

// Rutas protegidas para super administradores
Route::middleware(['auth:sanctum', 'role:super_admin'])->group(function () {
    Route::get('/admin/dashboard', [DashboardController::class, 'index']);
});

// Rutas protegidas para administradores
Route::middleware(['auth:sanctum', 'role:super_admin'])->group(function () {
    Route::apiResource('users', UserController::class);
    Route::get('/users/count', [UserController::class, 'countUsers']);
});