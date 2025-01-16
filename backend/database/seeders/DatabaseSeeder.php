<?php

namespace Database\Seeders;

use Database\Seeders\UnidadFuncionalSeeder as SeedersUnidadFuncionalSeeder;
use Illuminate\Database\Seeder;
use UnidadFuncionalSeeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $this->call([
            BarrioSeeder::class, 
            UsersTableSeeder::class,
            ProveedorSeeder::class,
            CategoriaGastoSeeder::class,
            // UsersWithRoleUserSeeder::class,             
            SeedersUnidadFuncionalSeeder::class,

        ]);
    }
}
