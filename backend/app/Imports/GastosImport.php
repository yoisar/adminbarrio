<?php

namespace App\Imports;

use App\Models\Gasto;
use App\Models\Barrio;
use App\Models\SubcategoriaGasto;
use App\Models\Proveedor;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class GastosImport implements ToModel, WithHeadingRow
{
    public function model(array $row)
    {
        $barrio = Barrio::firstOrCreate(['nombre' => $row['nombre_del_barrio']]);
        $subcategoria = SubcategoriaGasto::firstOrCreate(['nombre' => $row['subcategoria']]);
        $proveedor = Proveedor::firstOrCreate(['nombre' => $row['nombre_de_proveedor']]);

        return new Gasto([
            'barrio_id' => $barrio->id,
            'subcategoria_gasto_id' => $subcategoria->id,
            'proveedor_id' => $proveedor->id,
            'descripcion' => $row['descripcion'],
            'monto' => $row['monto'],
            'fecha' => $row['fecha'],
            'nro_factura' => $row['nro_de_factura'],
        ]);
    }
}