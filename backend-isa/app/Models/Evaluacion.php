<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Evaluacion extends Model
{
    use HasFactory;
    protected $fillable = ['titulo', 'fecha_revision', 'hora_revision', 'concluido', 'nota', 'id_proyecto_empresa', 'id_tipo_evaluacion'];
    public function tipo_evalucion()
    {
        return $this->HasOne(Tipo_evaluacion::class, 'id_tipo_evaluacion');
    }
    public function empresa()
    {
        return $this->hasOne(Empresa::class, 'id_proyecto_empresa');
    }
}
