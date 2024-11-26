<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Revision_planificacion extends Model
{
    protected $table = 'revision_planificacion';
    use HasFactory;
    protected $fillable = ['observacion','id_proyecto_empresa','id_estado_planificacion','planilla_creada'];
        
}
