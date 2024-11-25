<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRevisionPlanificacionTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('revision_planificacion', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->text('observacion')->default('');
            $table->boolean('planillas_creada')->default(false);
            $table->foreignId('id_proyecto_empresa')->constrained('proyecto_empresas')->onDelete('cascade');            
            $table->foreignId('id_estado_planificacion')->default('2')->constrained('estado_planificacion');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('revision_planificacion');
    }
}
