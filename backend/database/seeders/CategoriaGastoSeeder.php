<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\CategoriaGasto;
use App\Models\SubcategoriaGasto;

class CategoriaGastoSeeder extends Seeder
{
    public function run()
    {
        $categorias = [
            [
                'nombre' => 'Sueldos y Cargas Sociales',
                'descripcion' => 'Pagos a empleados y cargas sociales.',
                'subcategorias' => [
                    ['nombre' => 'Sueldo Básico', 'descripcion' => 'Pago del sueldo básico.'],
                    ['nombre' => 'Antigüedad', 'descripcion' => 'Pago por antigüedad.'],
                    ['nombre' => 'Presentismo', 'descripcion' => 'Pago por presentismo.'],
                    ['nombre' => 'Adicional especial', 'descripcion' => 'Pago de adicionales especiales.'],
                    ['nombre' => 'Diferencia Convenio', 'descripcion' => 'Pago de diferencias de convenio.'],
                    ['nombre' => 'Jubilación', 'descripcion' => 'Pago de jubilación.'],
                    ['nombre' => 'Ley 19.032', 'descripcion' => 'Pago de la Ley 19.032.'],
                    ['nombre' => 'Obra Social', 'descripcion' => 'Pago de obra social.'],
                    ['nombre' => 'Cuota Sindical', 'descripcion' => 'Pago de cuota sindical.'],
                    ['nombre' => 'Aporte Solidario', 'descripcion' => 'Pago de aporte solidario.'],
                    ['nombre' => 'No remunerativo', 'descripcion' => 'Pago no remunerativo.'],
                ],
            ],
            [
                'nombre' => 'Servicios',
                'descripcion' => 'Servicios como luz, agua, gas, etc.',
                'subcategorias' => [
                    ['nombre' => 'EMSA', 'descripcion' => 'Pago de EMSA.'],
                    ['nombre' => 'SAMSA', 'descripcion' => 'Pago de SAMSA.'],
                    ['nombre' => 'Gas a granel', 'descripcion' => 'Pago de gas a granel.'],
                ],
            ],
            [
                'nombre' => 'Mantenimiento',
                'descripcion' => 'Gastos en reparación y mantenimiento del edificio.',
                'subcategorias' => [
                    ['nombre' => 'Jardinería', 'descripcion' => 'Gastos en jardinería.'],
                    ['nombre' => 'Red Cloacal', 'descripcion' => 'Gastos en red cloacal.'],
                    ['nombre' => 'Electricidad', 'descripcion' => 'Gastos en electricidad.'],
                    ['nombre' => 'Pileta', 'descripcion' => 'Gastos en mantenimiento de la pileta.'],
                ],
            ],
            [
                'nombre' => 'Administración',
                'descripcion' => 'Costos administrativos.',
                'subcategorias' => [
                    ['nombre' => 'Seguridad', 'descripcion' => 'Pago de seguridad.'],
                    ['nombre' => 'Guarda Vidas', 'descripcion' => 'Pago de guarda vidas.'],
                    ['nombre' => 'Limpieza', 'descripcion' => 'Pago de limpieza.'],
                    ['nombre' => 'Administración', 'descripcion' => 'Costos administrativos.'],
                ],
            ],
            [
                'nombre' => 'Otros',
                'descripcion' => 'Gastos diversos no clasificados.',
                'subcategorias' => [
                    ['nombre' => 'Sindicato y Obra Social', 'descripcion' => 'Pago de sindicato y obra social.'],
                    ['nombre' => 'Convenio AFIP - F931', 'descripcion' => 'Pago de convenio AFIP - F931.'],
                    ['nombre' => 'ART', 'descripcion' => 'Pago de ART.'],
                    ['nombre' => 'Fondo Especial', 'descripcion' => 'Fondo especial para conservación y mejoramiento de espacios comunes.'],
                ],
            ],
        ];

        foreach ($categorias as $categoriaData) {
            $subcategorias = $categoriaData['subcategorias'];
            unset($categoriaData['subcategorias']);

            $categoria = CategoriaGasto::create($categoriaData);

            foreach ($subcategorias as $subcategoriaData) {
                $subcategoriaData['categoria_gasto_id'] = $categoria->id;
                SubcategoriaGasto::create($subcategoriaData);
            }
        }
    }
}