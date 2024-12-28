<?php

use App\Models\User;
use App\Notifications\TestNotification;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
Route::get('/send-notification', function () {
    $user = User::first(); // Obtén el primer usuario de la base de datos
    $user->notify(new TestNotification()); // Enviar la notificación

    return 'Notificación enviada';
});