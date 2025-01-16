<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Persona;
use App\Models\BarrioAdmin;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class UsersTableSeeder extends Seeder
{
    public function run()
    {
        // Crear roles si no existen
        $rolesBases = [
            'super_admin',            
            'admin',
            'propietario',
            'inquilino',
            'empleado',
        ];;
        foreach ($rolesBases as $role) {
            if (!Role::where('name', $role)->exists()) {
                Role::create(['name' => $role]);
            }
        }

        // Crear Super Admin
        $superAdmin = User::create([
            'name' => 'Yassel Omar',
            'email' => 'superadmin@adminbarrio.com',
            'password' => Hash::make(env('DEFAULT_USER_PASSWORD', 'yoisAdmin123')),
        ]);
        $superAdmin->assignRole('super_admin');
        Persona::create([
            'nombre' => "Yassel Omar",
            'apellido' => "Izquierdo Souchay",
            'telefono' => "+54-9-3764-624361",
            'direccion' => "Calle 137 a",
            'user_id' => $superAdmin->id,
        ]);
        BarrioAdmin::create([
            'user_id' => $superAdmin->id,
            'barrio_id' => 1,
            'default' => true,
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
        BarrioAdmin::create([
            'user_id' => $admin->id,
            'barrio_id' => 1,
            'default' => true,
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
            $randomRole = $rolesBases[array_rand($rolesBases)];
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
