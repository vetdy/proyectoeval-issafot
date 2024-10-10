<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class EvaluacionTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */

    public function test_lista_evaluaciones():void
    {
        $response = $this->get('/api/evaluacion');

        $response->assertStatus(200);
    }

    public function test_registar_evaluaciones_correcto():void
    {
        $response = $this->postJson('/api/evaluacion'
        ,['titulo'=>'evaluacion 1',
        'fecha_revision'=>'2024/11/1',
        'hora_revision'=>'18:00',
        'concluido'=>false,
        'nota'=>20,
        'id_empresa'=>'1',
        'id_tipo_evaluacion'=>'2']);

        $response->assertStatus(200);
    }

    public function test_registar_evaluaciones_fallido():void
    {
        $response = $this->postJson('/api/evaluacion'
        ,['titulo'=>'evaluacion 1',
        'fecha_revision'=>'2024/11/1',
        'hora_revisions'=>'18:00',
        'concluido'=>false,
        'nota'=>20,
        'id_empresa'=>'1',
        'id_tipo_evaluacion'=>'2']);

        $response->assertStatus(422);
    }
    public function test_mostar_evaluacion_exitoso():void
    {
        $response = $this->get('/api/evaluacion/1');
        $response->assertStatus(200);
    }

    public function test_mostar_evaluacion_fallido():void
    {
        $response = $this->get('/api/evaluacion/10');
        $response->assertStatus(404);
    }

    public function test_modificar_evaluacion_exitoso():void
    {
        $response = $this->putJson('/api/evaluacion/1'
        ,[
        'hora_revisions'=>'18:00',
        'concluido'=>false,
        'nota'=>70,
        'id_tipo_evaluacion'=>'2']);
        $response->assertStatus(200);
    }

    public function test_modificar_evaluacion_fallido_id():void
    {
        $response = $this->putJson('/api/evaluacion/10'
        ,[
        'hora_revisions'=>'18:00',
        'concluido'=>false,
        'nota'=>70,
        'id_tipo_evaluacion'=>'2']);
        $response->assertStatus(404);
    }

    public function test_modificar_evaluacion_fallido_dato():void
    {
        $response = $this->putJson('/api/evaluacion/1'
        ,[
        'hora_revisions'=>'18:00',
        'concluido'=>"no",
        ]);
        $response->assertStatus(422);
    }


    public function test_eliminar_evaluacion_exito():void
    {
        $response = $this->delete('/api/evaluacion/1');
        $response->assertStatus(200);
    }

    public function test_eliminar_evaluacion_fallido():void
    {
        $response = $this->delete('/api/evaluacion/10');
        $response->assertStatus(404);
    }
}
