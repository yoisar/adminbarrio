<?php

namespace App\Exports;

use App\Models\Gasto;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class GastosExport implements FromCollection, WithHeadings
{
    public function collection()
    {
        $gastos = Gasto::with(['barrio', 'subcategoria.categoria', 'proveedor'])->get();        
        if ($gastos->isEmpty()) {
            throw new \Exception('No hay datos para exportar');
        }

        return $gastos->map(function ($gasto) {
            return [
                'nombre_del_barrio' => $gasto->barrio->nombre ?? 'N/A',
                'categoria' => $gasto->subcategoria->categoria->nombre ?? 'N/A',
                'subcategoria' => $gasto->subcategoria->nombre ?? 'N/A',
                'descripcion' => $gasto->descripcion,
                'monto' => $gasto->monto,
                'fecha' => $gasto->fecha,
                'nombre_de_proveedor' => $gasto->proveedor->nombre ?? 'N/A',
                'nro_de_factura' => $gasto->nro_factura ?? 'N/A',
            ];
        });
    }

    public function headings(): array
    {
        return [
            'Nombre del Barrio',
            'Categoría',
            'Subcategoría',
            'Descripción',
            'Monto',
            'Fecha',
            'Nombre de Proveedor',
            'Nro de Factura',
        ];
    }
}