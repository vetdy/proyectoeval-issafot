<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item_planificacion extends Model
{
    use HasFactory;
    protected $table = 'item_planificacion';
    protected $fillable = ['nombre', 'id_planificacion'];
    public function planificacion()
    {
        return $this->hasOne(Planificacion::class);
    }
}
