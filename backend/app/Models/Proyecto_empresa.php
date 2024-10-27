<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Proyecto_empresa extends Model
{
    use HasFactory;
    protected $fillable=['habilitado','id_proyecto','id_empresa',"id_estado_contrato"];
    
}
