<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens;
    
    // Lista de roles permitidos
    public const ROLES = [
        'super_admin',
        'admin',
        'propietario',
        'inquilino',
        'empleado',
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'avatar',
        'role',
        'telefono',
        'direccion',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    /**
     * Get the cobros for the user.
     */
    public function cobros()
    {
        return $this->hasMany(Cobro::class);
    }

    /**
     * Get the unidades funcionales (UF) that the user owns or rents.
     */
    public function unidadesFuncionales()
    {
        return $this->belongsToMany(UnidadFuncional::class, 'unidad_funcional_user', 'user_id', 'unidad_funcional_id')
                    ->withPivot('tipo'); // tipo puede ser 'propietario' o 'inquilino'
    }

    /**
     * Get the barrios that the user administrates.
     */
    public function barriosAdministrados()
    {
        return $this->belongsToMany(Barrio::class, 'barrio_admin', 'user_id', 'barrio_id');
    }

    /**
     * Get the barrios where the user is an employee.
     */
    public function barriosEmpleado()
    {
        return $this->belongsToMany(Barrio::class, 'barrio_empleado', 'user_id', 'barrio_id');
    }
}
