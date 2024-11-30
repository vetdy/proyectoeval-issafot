<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateItemPlanillaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('item_planillas', function (Blueprint $table) {
            $table->id();
            $table->string('titulo');
            $table->boolean('creada')->default(true);
            $table->string('observacion')->default('');
            $table->foreignId('id_planilla_seguimiento')->constrained('planilla_seguimientos')->onDelete('cascade');
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
        Schema::dropIfExists('item_planillas');
    }
}
