<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Planilla_seguimiento extends Model
{
    use HasFactory;
    protected $fillable = ['titulo', 'fecha_revision', 'hora_revision', "id_proyecto_empresa",'concluido'];

    public function empresa()
    {
        return $this->hasOne(Empresa::class);
    }
}
