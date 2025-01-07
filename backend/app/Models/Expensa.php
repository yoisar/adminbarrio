<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Expensa extends Model
{
    use HasFactory;

    protected $fillable = [
        'barrio_id',
        'unidad_funcional_id',
        'periodo',
        'total',
        'saldo_pendiente',
        'fecha_vencimiento',
        'estado',
    ];

    /**
     * Get the barrio that owns the expensa.
     */
    public function barrio()
    {
        return $this->belongsTo(Barrio::class);
    }

    /**
     * Get the unidad funcional that owns the expensa.
     */
    public function unidadFuncional()
    {
        return $this->belongsTo(UnidadFuncional::class);
    }

    /**
     * Get the gastos for the expensa.
     */
    public function gastos()
    {
        return $this->hasMany(Gasto::class);
    }
}