<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\CategoriaGasto;

class CategoriaGastoSeeder extends Seeder
{
    public function run()
    {
        $categorias = [
            ['nombre' => 'Sueldos y Cargas Sociales', 'descripcion' => 'Pagos a empleados y cargas sociales.'],
            ['nombre' => 'Servicios', 'descripcion' => 'Servicios como luz, agua, gas, etc.'],
            ['nombre' => 'Mantenimiento', 'descripcion' => 'Gastos en reparación y mantenimiento del edificio.'],
            ['nombre' => 'Administración', 'descripcion' => 'Costos administrativos.'],
            ['nombre' => 'Otros', 'descripcion' => 'Gastos diversos no clasificados.']
        ];

        foreach ($categorias as $categoria) {
            CategoriaGasto::create($categoria);
        }
    }
}