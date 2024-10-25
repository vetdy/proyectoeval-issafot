<?php

namespace Tests\Feature;

use App\Models\Planilla_seguimiento;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ItemPlanillaTest extends TestCase
{
    #use RefreshDatabase;
    /**
     * A basic feature test example.
     *
     * @return void
     */

     public function test_lista_item_planillaes():void
     {
         $response = $this->get('/api/item_planilla');
 
         $response->assertStatus(200);
     }
 
     public function test_registar_item_planilla_correcto():void
     {
        $pg=Planilla_seguimiento::create(["titulo"=> "Revisión de Proyecto de Software",
            "fecha_revision"=> "2023-10-25",
            "hora_revision"=> "14:30",
            "id_empresa"=> 2]);
          
         $response = $this->postJson('/api/item_planilla'
         ,[ "titulo"=>"crear la base de datos",
            "observacion"=>"no tengo ninguna observacion",
            "id_planilla_seguimiento"=>$pg->id]);
         $response->assertStatus(200);
     }
 
     public function test_registar_item_planilla_fallido():void
     {
         $response = $this->postJson('/api/item_planilla'
         ,["nombre"=>"crear la base de datos",
            "id_planilla"=>"1"]);
          
         $response->assertStatus(422);
     }
     public function test_mostar_item_planilla_exitoso():void
     {
         $response = $this->get('/api/item_planilla/1');
         $response->assertStatus(200);
     }
 
     public function test_mostar_item_planilla_fallido():void
     {
         $response = $this->get('/api/item_planilla/99');
         $response->assertStatus(404);
     }
 
     public function test_modificar_item_planilla_exitoso():void
     {
         $response = $this->putJson('/api/item_planilla/1'
         ,[
         "titulo"=>"base de datos con mejorar",]);
         $response->assertStatus(200);
     }
 
     public function test_modificar_item_planilla_fallido_id():void
     {
         $response = $this->putJson('/api/item_planilla/99'
         ,[
         "id_planilla"=> 2,]);
         $response->assertStatus(404);
     }
 
     public function test_modificar_item_planilla_fallido_dato():void
     {
         $response = $this->putJson('/api/item_planilla/1'
         ,["id_planilla_seguimiento"=> 9,
         ]);
         $response->assertStatus(422);
     }
 
 
     public function test_eliminar_item_planilla_exito():void
     {
         $response = $this->delete('/api/item_planilla/1');
         $response->assertStatus(200);
     }
 
     public function test_eliminar_item_planilla_fallido():void
     {
         $response = $this->delete('/api/item_planilla/11');
         $response->assertStatus(404);
     }


     public function test_mostar_planilla_seguimiento_exitoso():void
     {
         $response = $this->get('/api/item_planilla/planilla_seguimiento/1');
         $response->assertStatus(200);
     }

     public function test_mostar_planilla_seguimiento_fallido():void
     {
         $response = $this->get('/api/item_planilla/planilla_seguimiento/5');
         $response->assertStatus(404);
     }

}
