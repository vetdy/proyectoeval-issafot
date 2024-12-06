<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSemestreTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('semestre', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->date("fecha_inicio");
            $table->date("fecha_generacion");
            $table->date("fecha_seguimiento");
            $table->date("fecha_evaluacion");
            $table->date("fecha_fin");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('semestre');
    }
}
