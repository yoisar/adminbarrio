<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Servicio extends Model
{
    use HasFactory;

    protected $fillable = [
        'barrio_id',
        'tipo',
        'proveedor',
        'estado',
        'monto',
    ];

    /**
     * Get the barrio that owns the servicio.
     */
    public function barrio()
    {
        return $this->belongsTo(Barrio::class);
    }

    /**
     * Get the facturas for the servicio.
     */
    public function facturas()
    {
        return $this->hasMany(Factura::class);
    }
}