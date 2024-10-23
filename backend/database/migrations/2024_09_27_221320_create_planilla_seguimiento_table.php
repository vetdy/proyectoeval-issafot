<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePlanillaSeguimientoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('planilla_seguimientos', function (Blueprint $table) {
            $table->id();
            $table->string('titulo');
            $table->date('fecha_revision');
            $table->time('hora_revision');
            $table->boolean('concluido')->default(false);
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
        Schema::dropIfExists('planilla_seguimientos');
    }
}
