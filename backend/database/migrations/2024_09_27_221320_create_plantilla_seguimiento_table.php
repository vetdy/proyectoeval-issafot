<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePlantillaSeguimientoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('plantilla_seguimientos', function (Blueprint $table) {
            $table->id();
            $table->string('titulo');
            $table->date('fecha_revision');
            $table->time('hora_revision');
            $table->timestamps();
            $table->foreignId('id_empresa')->constrained('empresas')->onDelete('cascade');
        });
    }
    
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('plantilla_seguimiento');
    }
}
