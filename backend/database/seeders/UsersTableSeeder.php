<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Spatie\Permission\Models\Role;
use App\Models\Persona;

class UsersTableSeeder extends Seeder
{
    public function run()
    {
        // Lista de roles permitidos
        $roles = User::ROLES;

        // Crear roles
        $rolesBases = ['admin', 'propietario', 'inquilino', 'empleado'];
        foreach ($roles as $role) {
            Role::firstOrCreate(['name' => $role]);
        }

        // Crear Super Admin
        $superAdmin = User::create([
            'name' => 'yois',
            'email' => 'sioy23@gmail.com',
            'password' => Hash::make(env('DEFAULT_USER_PASSWORD', 'yoisAdmin123')),
        ]);
        $superAdmin->assignRole('super_admin');
        Persona::create([
            'nombre' => "Yassel Omar ",
            'apellido' => "Izquierdo Souchay",
            'telefono' => "+54-9-3764-624361",
            'direccion' => "Calle 137 a",
            'user_id' => $superAdmin->id,
        ]);

        // Crear Admin
        $admin = User::create([
            'name' => 'Admin',
            'email' => 'admin@adminbarrio.com',
            'password' => Hash::make('password123'),
        ]);
        $admin->assignRole('admin');
        Persona::create([
            'nombre' => "Administrador",
            'apellido' => "Apellido administration",
            'telefono' => "123456",
            'direccion' => "xxxxx",
            'user_id' => $admin->id,
        ]);

        // Crear Usuario Vecino/Inquilino
        $user = User::create([
            'name' => 'Juan Pérez',
            'email' => 'vecino@adminbarrio.com',
            'password' => Hash::make('password123'),
        ]);
        $user->assignRole('inquilino');

        // Crear usuarios adicionales con roles aleatorios
        for ($i = 1; $i <= 50; $i++) {
            $randomRole = $roles[array_rand($rolesBases)];
            $newUser = User::create([
                'name' => "Usuario $i",
                'email' => "usuario$i@example.com",
                'password' => Hash::make('password'),
            ]);
            $newUser->assignRole($randomRole);

            // Crear persona asociada al usuario
            Persona::create([
                'nombre' => "Nombre $i",
                'apellido' => "Apellido $i",
                'telefono' => "123456789$i",
                'direccion' => "Dirección $i",
                'user_id' => $newUser->id,
            ]);
        }
    }
}
