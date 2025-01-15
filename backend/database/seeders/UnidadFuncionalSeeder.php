<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\UnidadFuncional;

class UnidadFuncionalSeeder extends Seeder
{
    public function run()
    {
        // Crear las primeras 30 unidades funcionales en el barrio 1
        for ($i = 1; $i <= 30; $i++) {
            UnidadFuncional::create([
                'numero' => $i,
                'barrio_id' => 1,
                'propietario_id' => rand(1, 50),
                'inquilino_id' => rand(1, 50),
                'saldo_actual' => rand(-10000, 50000),
                'estado' => 'activo',
            ]);
        }

        // Crear las unidades funcionales restantes en barrios aleatorios
        for ($i = 31; $i <= 30; $i++) {
            UnidadFuncional::create([
                'numero' => $i,
                'barrio_id' => rand(2, 10),
                'propietario_id' => rand(1, 50),
                'inquilino_id' => rand(1, 50),
                'saldo_actual' => rand(-10000, 50000),
                'estado' => 'activo',
            ]);
        }
    }
}