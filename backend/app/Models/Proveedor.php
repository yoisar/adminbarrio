<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Proveedor extends Model
{
    use HasFactory;
    protected $table = 'proveedores';
    protected $fillable = [
        'nombre',
        'descripcion',
    ];

    /**
     * Get the gastos for the proveedor.
     */
    public function gastos()
    {
        return $this->hasMany(Gasto::class);
    }
}
