<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item_planilla extends Model
{
    use HasFactory;
    protected $fillable = ['titulo', 'id_planilla_seguimiento', 'observacion'];
    public function plantilla_seguimiento()
    {
        return $this->belongsTo(Planilla_seguimiento::class, 'id_plantilla_seguimiento');
    }
}
