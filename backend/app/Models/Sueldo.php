<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sueldo extends Model
{
    use HasFactory;

    protected $fillable = [
        'empleado_id',
        'periodo',
        'monto',
        'fecha_pago',
        'descuentos',
        'neto',
    ];

    /**
     * Get the empleado that owns the sueldo.
     */
    public function empleado()
    {
        return $this->belongsTo(Empleado::class, );
    }
}