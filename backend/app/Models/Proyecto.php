<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Proyecto extends Model
{
    use HasFactory;
    protected $fillable =['nombre','descripcion','codigo','fecha_inicio','fecha_cierre','id_creado_por'];
}
