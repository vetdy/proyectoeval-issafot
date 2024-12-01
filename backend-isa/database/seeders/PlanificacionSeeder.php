<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PlanificacionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        
        DB::table('planificaciones')->insert([
            [
                'titulo' => 'sprint 1',
                'fecha_inicio' => '2024/9/8',
                'fecha_fin' => '2024/9/28',
                'dia_revision' => 2,
                'hora_revision' => '8:15',
                'id_proyecto_empresa' => '2',
                
            ],
            [
                'titulo' => 'sprint 2',
                'fecha_inicio' => '2024/9/29',
                'fecha_fin' => '2024/11/20',
                'dia_revision' => 2,
                'hora_revision' => '8:15',
                'id_proyecto_empresa' => '2',
                
            ],
            [
                'titulo' => 'sprint 3',
                'dia_revision' => '2',
                'hora_revision' => '8:15',
                'fecha_inicio' => '2024/11/21',
                'fecha_fin' => '2024/12/8',
                'id_proyecto_empresa' => '2',
                    
            ],
            [
                'titulo' => 'sprint 1',
                'dia_revision' => '2',
                'hora_revision' => '8:15',
                'fecha_inicio' => '2024/11/10',
                'fecha_fin' => '2024/11/19',
                'id_proyecto_empresa' => '3',
                    
            ],
            [
                'titulo' => 'sprint 2',
                'dia_revision' => '2',
                'hora_revision' => '8:15',
                'fecha_inicio' => '2024/11/20',
                'fecha_fin' => '2024/12/10',
                'id_proyecto_empresa' => '3',
                    
            ],
            [
                'titulo' => 'sprint 3',
                'dia_revision' => '2',
                'hora_revision' => '8:15',
                'fecha_inicio' => '2024/12/10',
                'fecha_fin' => '2024/12/30',
                'id_proyecto_empresa' => '3',
                    
            ],
        ]);
        DB::table('item_planificacion')->insert([
            [
                'nombre' => 'product backlog sprint',
                'id_planificacion' => '1'
            ],
            [
                'nombre' => 'product backlog sprint con carry over',
                'id_planificacion' => '2'
            ],
            [
                'nombre' => 'Correcion del product backlog',
                'id_planificacion' => '3'
            ],
            [
                'nombre' => 'historias de usuario del sprint',
                'id_planificacion' => '1'
            ],
            [
                'nombre' => 'historias de usuario mejoradas para el sprint',
                'id_planificacion' => '2'
            ],
            [
                'nombre' => 'mejora de las historias del sprint3',
                'id_planificacion' => '3'
            ],[
                'nombre' => 'mockups de las interfaces',
                'id_planificacion' => '1'
            ],
            [
                'nombre' => 'mejora a las mockups',
                'id_planificacion' => '2'
            ],
            [
                'nombre' => 'mockups del sprint3',
                'id_planificacion' => '3'
            ],[
                'nombre' => 'Manual de usuario',
                'id_planificacion' => '3'
            ],
            [
                'nombre' => 'Manual de instalacion',
                'id_planificacion' => '3'
            ],

            [
                'nombre' => 'poblar la base de datos',
                'id_planificacion' => '4'
            ],
            [
                'nombre' => 'la creacion de proyecyos',
                'id_planificacion' => '4'
            ],
            [
                'nombre' => 'creacion de modelos en la base de datos',
                'id_planificacion' => '4'
            ],
            [
                'nombre' => 'crear diseno de base de datos',
                'id_planificacion' => '5'
            ],
            [
                'nombre' => 'diseños de ux implementado',
                'id_planificacion' => '5'
            ],
            [
                'nombre' => 'creacion endpoint backend',
                'id_planificacion' => '5'
            ],
        ]);
    }
}
