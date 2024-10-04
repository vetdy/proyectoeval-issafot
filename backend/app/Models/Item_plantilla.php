<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class item_plantilla extends Model
{
    use HasFactory;
    protected $fillable=['titulo','fecha_revision','hora_revision',];
    public function plantilla_seguimiento(){
        return $this->hasOne(Plantilla_seguimiento::class);
    }
}
