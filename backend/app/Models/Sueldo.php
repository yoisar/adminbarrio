<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sueldo extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'monto', 'fecha'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function cargasSociales()
    {
        return $this->hasMany(CargaSocial::class);
    }

    public function conceptos()
    {
        return $this->hasMany(Concepto::class);
    }
}
