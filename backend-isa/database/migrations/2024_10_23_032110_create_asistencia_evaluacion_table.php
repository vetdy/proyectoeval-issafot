<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAsistenciaEvaluacionTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('asistencia_evaluacion', function (Blueprint $table) {
            $table->id();
            $table->boolean('presente')->default(true); 
            $table->timestamps();
            $table->string('observacion')->default(''); 
            $table->foreignId('id_evaluacion')->constrained('evaluacions')->onDelete('cascade');
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
        Schema::dropIfExists('asistencia_evaluacion');
    }
}
