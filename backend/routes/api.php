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
    CategoriaGastoController
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
    Route::post('/login', function (Request $request) {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $user = User::where('email', $credentials['email'])->first();

        if (!$user || !Hash::check($credentials['password'], $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        // Generar un token de acceso
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer'
        ]);
    });
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
});