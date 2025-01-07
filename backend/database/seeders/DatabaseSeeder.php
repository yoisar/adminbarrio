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
            UsersTableSeeder::class,
            CategoriaGastoSeeder::class,
            // UsersWithRoleUserSeeder::class, 
            BarrioSeeder::class, 
            SeedersUnidadFuncionalSeeder::class,

        ]);
    }
}
