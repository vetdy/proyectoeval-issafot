<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class TareaTest extends TestCase
{
    #use RefreshDatabase;
    /**
     * A basic feature test example.
     *
     * @return void
     */

     public function test_lista_tareaes():void
     {
         $response = $this->get('/api/tarea');
 
         $response->assertStatus(200);
     }
 
     public function test_registar_tarea_correcto():void
     {
         $response = $this->postJson('/api/tarea'
         ,['titulo'=>"item 1 sprin 1",
        'id_evaluacion'=>2 ]);
        
         $response->assertStatus(200);
     }
 
     public function test_registar_tarea_fallido():void
     {
         $response = $this->postJson('/api/tarea'
         ,["nombre"=>"crear la base de datos",
            "id_planilla"=>"1"]);
          
         $response->assertStatus(422);
     }
     public function test_mostar_tarea_exitoso():void
     {
         $response = $this->get('/api/tarea/1');
         $response->assertStatus(200);
     }
 
     public function test_mostar_tarea_fallido():void
     {
         $response = $this->get('/api/tarea/99');
         $response->assertStatus(404);
     }
 
     public function test_modificar_tarea_exitoso():void
     {
         $response = $this->putJson('/api/tarea/1'
         ,[
         "titulo"=>"base de datos con mejorar",]);
         $response->assertStatus(200);
     }
 
     public function test_modificar_tarea_fallido_id():void
     {
         $response = $this->putJson('/api/tarea/99'
         ,[
         "observacion"=> "ya solucionarion",]);
         $response->assertStatus(404);
     }
 
     public function test_modificar_tarea_fallido_dato():void
     {
         $response = $this->putJson('/api/tarea/1'
         ,["terminado"=> "no",
         ]);
         $response->assertStatus(422);
     }
 
 
     public function test_eliminar_tarea_exito():void
     {
         $response = $this->delete('/api/tarea/1');
         $response->assertStatus(200);
     }
 
     public function test_eliminar_tarea_fallido():void
     {
         $response = $this->delete('/api/tarea/11');
         $response->assertStatus(404);
     }
}
