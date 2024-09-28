<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDocumentoEmpresaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('documento_empresas', function (Blueprint $table) {
            $table->id();
            $table->string('titulo');
            $table->string('url_ubicacion');
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
        Schema::dropIfExists('_documento_empresa');
    }
}
