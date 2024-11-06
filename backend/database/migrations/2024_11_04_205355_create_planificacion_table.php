<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePlanificacionTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('planificaciones', function (Blueprint $table) {
            $table->id();
            $table->string('titulo');
            $table->string('fecha_inicio');
            $table->string('fecha_fin');
            $table->string('dia_revision');
            $table->string('hora_revision');
            $table->string('observacion')->default('');
            $table->timestamps();
            $table->foreignId('id_estado_planificacion')->default('2')->constrained('estado_planificacion');
            $table->foreignId('id_proyecto_empresa')->constrained('proyecto_empresas')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('planificaciones');
    }
}
