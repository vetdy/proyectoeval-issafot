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
        Schema::create('asistencia_planilla_seguimiento', function (Blueprint $table) {
            $table->id();
            $table->boolean('presente')->default(false); 
            $table->timestamps();
            $table->string('observacion')->default(''); 
            $table->foreignId('id_planilla_seguimiento')->constrained('planilla_seguimientos')->onDelete('cascade');
            $table->foreignId('id_usuario')->constrained('usuarios')->onDelete('cascade');
            
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('asistencia_planilla_segimiento');
    }
}
