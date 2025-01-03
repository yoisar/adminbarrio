<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Concepto extends Model
{
    use HasFactory;

    protected $fillable = ['sueldo_id', 'carga_social_id', 'nombre', 'monto'];

    public function sueldo()
    {
        return $this->belongsTo(Sueldo::class);
    }

    public function cargaSocial()
    {
        return $this->belongsTo(CargaSocial::class);
    }
}
