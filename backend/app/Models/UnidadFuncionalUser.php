<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UnidadFuncionalUser extends Model
{
    use HasFactory;

    protected $table = 'unidad_funcional_user';

    protected $fillable = [
        'user_id',
        'unidad_funcional_id',
        'tipo',
    ];

    /**
     * Get the user that owns the UnidadFuncionalUser.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the unidad funcional that owns the UnidadFuncionalUser.
     */
    public function unidadFuncional()
    {
        return $this->belongsTo(UnidadFuncional::class);
    }
}