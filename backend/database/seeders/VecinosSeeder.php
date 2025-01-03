<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class VecinosSeeder extends Seeder
{
    public function run()
    {
        $users = [];

        for ($i = 1; $i <= 50; $i++) {
            $users[] = [
                'name' => "Propietario $i",
                'email' => "propietario$i@example.com",
                'password' => Hash::make('password'),
                'role' => 'propietario',
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        for ($i = 1; $i <= 50; $i++) {
            $users[] = [
                'name' => "Inquilino $i",
                'email' => "inquilino$i@example.com",
                'password' => Hash::make('password'),
                'role' => 'inquilino',
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        User::insert($users);
    }
}
