<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UnidadFuncional extends Model
{
    use HasFactory;
    protected $table = 'unidades_funcionales';
    protected $fillable = [
        'barrio_id',
        'propietario_id',
        'inquilino_id',
        'numero',
        'saldo_actual',
        'estado',
    ];

    /**
     * Get the barrio that owns the unidad funcional.
     */
    public function barrio()
    {
        return $this->belongsTo(Barrio::class);
    }

    /**
     * Get the propietario (user) of the unidad funcional.
     */
    public function propietario()
    {
        return $this->belongsTo(User::class, 'propietario_id');
    }

    /**
     * Get the inquilino (user) of the unidad funcional.
     */
    public function inquilino()
    {
        return $this->belongsTo(User::class, 'inquilino_id');
    }

    /**
     * Get the expensas for the unidad funcional.
     */
    public function expensas()
    {
        return $this->hasMany(Expensa::class);
    }
}
