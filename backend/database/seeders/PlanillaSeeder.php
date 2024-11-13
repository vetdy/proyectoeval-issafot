<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use \Illuminate\Support\Facades\DB;

class PlanillaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        DB::table('planilla_seguimientos')->insert([
            
            
            [
                'titulo' => 'presencial',
                'fecha_revision' => '2019/10/28',
                'hora_revision' => '18:00',
                'id_proyecto_empresa' => '3'
            ],
            [
                'titulo' => 'revision 1',
                'fecha_revision' => '2019/10/28',
                'hora_revision' => '18:00',
                'id_proyecto_empresa' => '3'
            ],
            [
                'titulo' => 'revision borrar',
                'fecha_revision' => '2019/10/28',
                'hora_revision' => '18:00',
                'id_proyecto_empresa' => '3'
            ],
            [
                'titulo' => 'revision 2',
                'fecha_revision' => '2019/10/28',
                'hora_revision' => '18:00',
                'id_proyecto_empresa' => '3'
            ],

        ]);
        DB::table('item_planillas')->insert([
            [
                'titulo' => 'product backlog',
                'id_planilla_seguimiento' => '1',
            ],
            [
                'titulo' => 'historias de usuario revisadas',
                'id_planilla_seguimiento' => '1'
            ],
            [
                'titulo' => 'Sprint backlog',
                'id_planilla_seguimiento' => '1'
            ],
            [
                'titulo' => 'product backlog',
                'id_planilla_seguimiento' => '2'
            ],
            [
                'titulo' => 'historias de usuario revisadas',
                'id_planilla_seguimiento' => '2'
            ],
            [
                'titulo' => 'Sprint backlog',
                'id_planilla_seguimiento' => '2'
            ],
            [
                'titulo' => 'product backlog',
                'id_planilla_seguimiento' => '3'
            ],
            [
                'titulo' => 'historias de usuario revisadas',
                'id_planilla_seguimiento' => '3'
            ],
            [
                'titulo' => 'Sprint backlog',
                'id_planilla_seguimiento' => '3'
            ],

        ]);
    }
}
