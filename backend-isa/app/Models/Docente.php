<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Docente extends Model
{
    use HasFactory;
    protected $table = 'usuarios';
    protected $primaryKey = 'id';
    protected $fillable = ['nombre', 'apellido', 'codigo_sis', 'email', 'telefono', 'contrasena'];
    public function id_rol()
    {
        return $this->hasOne(Socio_empresa::class);
    }
    protected static function booted()
    {
        static::addGlobalScope('rol', function (Builder $builder) {
            $builder->where('id_rol', 1);
        });
    }
}
