<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEvaluacionTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('evaluacions', function (Blueprint $table) {
            $table->id();
            $table->string('titulo');
            $table->date('fecha_revision');
            $table->time('hora_revision');
            $table->boolean('concluido')->default(false);
            $table->integer('nota')->default(0);
            $table->foreignId('id_proyecto_empresa')->constrained('proyecto_empresas');
            $table->foreignId('id_tipo_evaluacion')->constrained('tipo_evaluacions');
            $table->timestamps();
        });
  
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('evaluacions');
    }
}
