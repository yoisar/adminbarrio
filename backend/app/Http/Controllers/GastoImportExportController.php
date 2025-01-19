<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Gasto;
use App\Imports\GastosImport;
use App\Exports\GastosExport;
use Maatwebsite\Excel\Facades\Excel;

class GastoImportExportController extends Controller
{
    // Exportar gastos a Excel
    public function export()
    {
        return Excel::download(new GastosExport, 'gastos.xlsx');
    }

    // Importar gastos desde Excel
    public function import(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:xlsx',
        ]);

        Excel::import(new GastosImport, $request->file('file'));

        return response()->json(['message' => 'Gastos importados correctamente'], 200);
    }
}