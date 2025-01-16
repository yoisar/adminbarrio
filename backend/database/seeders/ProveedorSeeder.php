<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Proveedor;

class ProveedorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $proveedores = [
            [
                'nombre' => 'EMSA',
                'descripcion' => 'Empresa de energía eléctrica, responsable del alumbrado público.'
            ],
            [
                'nombre' => 'SAMSA',
                'descripcion' => 'Servicio de agua y saneamiento.'
            ],
            [
                'nombre' => 'GAS A GRANEL',
                'descripcion' => 'Proveedor de gas en cilindros para los barrios.'
            ],
            [
                'nombre' => 'B+J',
                'descripcion' => 'Seguridad privada para los barrios.'
            ],
            [
                'nombre' => 'Romero José Iván',
                'descripcion' => 'Servicio de guardavidas.'
            ],
            [
                'nombre' => 'Romero, Lucía',
                'descripcion' => 'Servicio de limpieza.'
            ],
            [
                'nombre' => 'Maldonado, Victor',
                'descripcion' => 'Responsable de la administración de los barrios.'
            ],
            [
                'nombre' => 'ADOLFO SARTORI S.A.',
                'descripcion' => 'Proveedor de aceites y combustibles para jardinería.'
            ],
            [
                'nombre' => 'PETROVALLE',
                'descripcion' => 'Proveedor de combustible.'
            ],
            [
                'nombre' => 'CORTESE',
                'descripcion' => 'Proveedor de repuestos y herramientas para mantenimiento.'
            ],
            [
                'nombre' => 'PENAYO',
                'descripcion' => 'Servicios de desobstrucción de redes cloacales y reparación de agua.'
            ],
            [
                'nombre' => 'SANITARIOS PLASTICOS',
                'descripcion' => 'Proveedor de materiales de plomería.'
            ],
            [
                'nombre' => 'MARCELO RIOS',
                'descripcion' => 'Proveedor de luminarias y servicios de electricidad.'
            ],
            [
                'nombre' => 'SOLARPOOLS',
                'descripcion' => 'Insumos de limpieza para piletas.'
            ],
            [
                'nombre' => 'OTEDYC',
                'descripcion' => 'Obra social para empleados de comercio.'
            ],
            [
                'nombre' => 'OSPEDYC',
                'descripcion' => 'Obra social para el personal de edificios de renta y horizontal.'
            ],
            [
                'nombre' => 'ART',
                'descripcion' => 'Aseguradora de riesgos del trabajo.'
            ]
        ];

        foreach ($proveedores as $proveedor) {
            Proveedor::create($proveedor);
        }
    }
}
