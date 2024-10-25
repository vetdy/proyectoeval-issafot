<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAsistenciaPlanillaSegimientoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('asistencia_planilla_segimiento', function (Blueprint $table) {
            $table->id();
            $table->boolean('presente'); 
            $table->timestamps();
            $table->string('observacion'); 
            $table->string('id_planilla_seguimiento')->constrained('planilla_seguimiento')->onDelete('cascade');
            $table->string('id_usuario')->constrained('usuarios')->onDelete('cascade');
            
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('_asistencia_planilla_segimiento');
    }
}