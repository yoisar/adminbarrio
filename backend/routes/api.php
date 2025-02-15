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
    GastoImportExportController,
    UnidadFuncionalController, // Importar el controlador de Unidades Funcionales
    ProveedorController // Importar el controlador de Proveedores
};
use App\Http\Middleware\LogApiRequest;

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
Route::middleware(['api', LogApiRequest::class])->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/verify_token', [AuthController::class, 'verifyToken'])->middleware('auth:sanctum');
    
    Route::get('/dashboard', [DashboardController::class, 'index']);
    
    Route::get('/gastos/barrio/{barrio_id}', [GastosController::class, 'getGastosByBarrio']); // Endpoint para obtener gastos por barrio
    Route::post('/gastos/import', [GastoImportExportController::class, 'import']); // Endpoint para importar gastos
    Route::get('/gastos/export', [GastoImportExportController::class, 'export']); // Endpoint para exportar gastos
    Route::apiResource('gastos', GastosController::class);
    
    Route::get('/expensas/total', [ExpensasController::class, 'getTotalExpensas']); // Endpoint para obtener el total de expensas
    Route::apiResource('expensas', ExpensasController::class);
    
    Route::get('/cobros/total', [CobrosController::class, 'getTotalCobros']); // Endpoint para obtener el total de cobros
    Route::get('/cobros/morosos', [CobrosController::class, 'morosos']);
    Route::apiResource('cobros', CobrosController::class);
    
    Route::apiResource('categorias', CategoriaGastoController::class);
    Route::apiResource('subcategorias', SubcategoriaGastoController::class); // Endpoint resource para Subcategorias de Gastos
    
    Route::apiResource('proveedores', ProveedorController::class); // Endpoint resource para Proveedores
    
    Route::get('/barrios/admin', [BarrioController::class, 'getBarriosByAdmin']); // Endpoint para obtener barrios administrados por el usuario actual
    Route::apiResource('barrios', BarrioController::class); // Endpoint resource para Barrios
    
    Route::apiResource('sueldos', SueldoController::class);
    Route::apiResource('cargas-sociales', CargaSocialController::class);
    Route::apiResource('conceptos', ConceptoController::class);
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
    Route::get('/users/count', [UserController::class, 'countUsers']);
    Route::get('/users/role/user', [UserController::class, 'listUsers']); // Endpoint para listar usuarios con rol 'user'
    Route::apiResource('users', UserController::class);
});
