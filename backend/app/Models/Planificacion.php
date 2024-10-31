<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Planificacion extends Model
{
    protected $table = 'planificaciones';
    use HasFactory;
    protected $fillable = ['titulo', "dia_revision", 'hora_revision', 'id_proyecto_empresa', 'fecha_inicio', 'fecha_fin'];
    public function proyecto_empresa()
    {
        return $this->hasOne(Proyecto_empresa::class);
    }
}
