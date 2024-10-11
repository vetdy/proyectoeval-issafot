<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item_plantilla extends Model
{
    use HasFactory;
    protected $fillable=['titulo','id_plantilla_seguimiento'];
    public function plantilla_seguimiento(){
        return $this->belongsTo(Plantilla_seguimiento::class, 'id_plantilla_seguimiento');
    }
}
    