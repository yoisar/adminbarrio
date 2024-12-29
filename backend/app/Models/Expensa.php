<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Expensa extends Model
{
    use HasFactory;

    protected $fillable = [
        'fecha_vencimiento',
        'total',
        'saldo_anterior',
        'monto_pagado',
    ];

    public function gastos()
    {
        return $this->hasMany(Gasto::class);
    }

    // Relación con Cobros (una expensa puede tener múltiples cobros)
    public function cobros()
    {
        return $this->hasMany(Cobro::class);
    }

    public function calcularTotalGastos()
    {
        return $this->gastos->sum('monto');
    }

    public function calcularSaldoPendiente()
    {
        return $this->total - $this->monto_pagado;
    }
}
