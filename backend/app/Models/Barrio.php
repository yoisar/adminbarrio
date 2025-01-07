<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Barrio extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre',
        'direccion',
        'descripcion',
    ];

    /**
     * Get the unidades funcionales (UF) for the barrio.
     */
    public function unidadesFuncionales()
    {
        return $this->hasMany(UnidadFuncional::class);
    }

    /**
     * Get the gastos for the barrio.
     */
    public function gastos()
    {
        return $this->hasMany(Gasto::class);
    }

    /**
     * Get the expensas for the barrio.
     */
    public function expensas()
    {
        return $this->hasMany(Expensa::class);
    }

    /**
     * Get the servicios for the barrio.
     */
    public function servicios()
    {
        return $this->hasMany(Servicio::class);
    }

    /**
     * Get the users that administrate the barrio.
     */
    public function administradores()
    {
        return $this->belongsToMany(User::class, 'barrio_admin', 'barrio_id', 'user_id');
    }
}