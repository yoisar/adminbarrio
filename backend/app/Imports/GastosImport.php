<?php

namespace App\Imports;

use App\Models\Gasto;
use App\Models\Barrio;
use App\Models\SubcategoriaGasto;
use App\Models\Proveedor;
use App\Models\CategoriaGasto;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class GastosImport implements ToModel, WithHeadingRow
{
    public function model(array $row)
    {
        $barrio = Barrio::firstOrCreate(['nombre' => $row['nombre_del_barrio']]);
        $categoria = CategoriaGasto::firstOrCreate(['nombre' => $row['categoria']]);
        $subcategoria = SubcategoriaGasto::firstOrCreate([
            'nombre' => $row['subcategoria'],
            'categoria_gasto_id' => $categoria->id
        ]);
        $proveedor = Proveedor::firstOrCreate(['nombre' => $row['nombre_de_proveedor']]);

        // Verificar si el gasto ya existe para evitar duplicados
        $existingGasto = Gasto::where('barrio_id', $barrio->id)
            ->where('subcategoria_gasto_id', $subcategoria->id)
            ->where('proveedor_id', $proveedor->id)
            ->where('descripcion', $row['descripcion'])
            ->first();

        if ($existingGasto) {
            // Actualizar los valores de monto, fecha y número de factura
            $existingGasto->update([
                'monto' => $row['monto'],
                'fecha' => $row['fecha'],
                'nro_factura' => $row['nro_de_factura'],
            ]);
            return null; // No crear un nuevo registro si ya existe
        }

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