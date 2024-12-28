<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UsersTableSeeder extends Seeder
{
    public function run()
    {
        // Crear Super Admin
        User::create([
            'name' => 'yois',
            'email' => 'sioy23@gmail.com',
            'password' => Hash::make(env('DEFAULT_USER_PASSWORD', 'yoisAdmin123')),
            // 'password' => Hash::make('yoisAdmin123'),
            'role' => 'super_admin', // Puedes usar un sistema de roles aquí
        ]);

        // Crear Admin
        User::create([
            'name' => 'Admin',
            'email' => 'admin@adminbarrio.com',
            'password' => Hash::make('password123'),
            'role' => 'admin',
        ]);

        // Crear Usuario Vecino/Inquilino
        User::create([
            'name' => 'Juan Pérez',
            'email' => 'vecino@adminbarrio.com',
            'password' => Hash::make('password123'),
            'role' => 'user',
        ]);
    }
}
