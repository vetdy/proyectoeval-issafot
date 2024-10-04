<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProyectoEmpresaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('proyecto_empresas', function (Blueprint $table) {
            $table->id();
            $table->boolean('habilitado');
            $table->string('id_proyecto')->constrained('proyectos')->onDelete('cascade');
            $table->string('id_empresa')->constrained('empresas')->onDelete('cascade');
            $table->string('id_estado_contrato')->constrained('estado_contratos')->onDelete('cascade');
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
        Schema::dropIfExists('proyecto_empresa');
    }
}
