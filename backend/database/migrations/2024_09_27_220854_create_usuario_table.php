<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsuarioTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('usuarios', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->string('apellido');
            $table->string('codigo_sis')->unique();
            $table->string('correo')->unique();
            #$table->timestamp('email_verified_at')->nullable();
            $table->string('telefono');
            $table->string('contrasena');
            #$table->rememberToken();
            $table->timestamps();
            $table->foreignId('id_rol')->constrained('rols')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('usuarios');
    }
}
