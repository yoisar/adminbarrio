<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CargaSocial extends Model
{
    use HasFactory;

    protected $fillable = ['sueldo_id', 'monto', 'descripcion'];

    public function sueldo()
    {
        return $this->belongsTo(Sueldo::class);
    }

    public function conceptos()
    {
        return $this->hasMany(Concepto::class);
    }
}
