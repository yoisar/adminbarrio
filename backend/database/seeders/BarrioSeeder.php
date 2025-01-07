<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Barrio;

class BarrioSeeder extends Seeder
{
    public function run()
    {
        // Crear el primer barrio con los datos especificados
        Barrio::create([
            'nombre' => 'Barrio Panambi Lapachos',
            'direccion' => 'Calle 137',
            'descripcion' => 'Barrio privado',
        ]);

        // Crear barrios adicionales en un bucle
        for ($i = 1; $i <= 10; $i++) {
            Barrio::create([
                'nombre' => "Barrio $i",
                'direccion' => "Dirección Barrio $i",
                'descripcion' => "Descripción del Barrio $i",
            ]);
        }
    }
}