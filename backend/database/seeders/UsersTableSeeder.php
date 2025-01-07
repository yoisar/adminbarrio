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
            'role' => 'super_admin',
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

        // Crear usuarios adicionales con roles aleatorios
        $roles = ['admin', 'propietario', 'inquilino', 'empleado'];

        for ($i = 1; $i <= 50; $i++) {
            User::create([
                'name' => "Usuario $i",
                'email' => "usuario$i@example.com",
                'password' => Hash::make('password'),
                'role' => $roles[array_rand($roles)],
                // 'telefono' => "12345678$i",
                // 'direccion' => "Dirección Usuario $i",
            ]);
        }
    }
}