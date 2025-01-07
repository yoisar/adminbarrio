<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Factura extends Model
{
    use HasFactory;

    protected $fillable = [
        'servicio_id',
        'monto',
        'fecha_emision',
        'fecha_vencimiento',
        'estado',
    ];

    /**
     * Get the servicio that owns the factura.
     */
    public function servicio()
    {
        return $this->belongsTo(Servicio::class);
    }
}