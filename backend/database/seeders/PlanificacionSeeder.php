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

        DB::table('estado_planificacion')->insert([
            [
                'estado' => 'no existe',
                'descripcion' => 'la planificacion no existe'
            ],
            [
                'estado' => 'en revision',
                'descripcion' => 'la planificacion esta en revision'
            ],
            [
                'estado' => 'aceptado',
                'descripcion' => 'la planificacion fue aceptado'
            ],
            [
                'estado' => 'rechazado',
                'descripcion' => 'la planificacion fue rechazada'
            ]
        ]);
        DB::table('planificaciones')->insert([
            [
                'titulo' => 'sprint 1',
                'fecha_inicio' => '2024/9/8',
                'fecha_fin' => '2024/9/28',
                'dia_revision' => 2,
                'hora_revision' => '8:15',
                'id_proyecto_empresa' => '2',
                'id_estado_planificacion'=>3
            ],
            [
                'titulo' => 'sprint 2',
                'fecha_inicio' => '2024/9/29',
                'fecha_fin' => '2024/11/20',
                'dia_revision' => 2,
                'hora_revision' => '8:15',
                'id_proyecto_empresa' => '2',
                'id_estado_planificacion'=>3
            ],
            [
                'titulo' => 'sprint 3',
                'dia_revision' => '2',
                'hora_revision' => '8:15',
                'fecha_inicio' => '2024/11/21',
                'fecha_fin' => '2024/12/8',
                'id_proyecto_empresa' => '2',
                'id_estado_planificacion'=>3    
            ],

        ]);
        DB::table('item_planificacion')->insert([
            [
                'nombre' => 'codificacion de historias de usuario',
                'id_planificacion' => '1'
            ],
            [
                'nombre' => 'codificacion de historias de usuario',
                'id_planificacion' => '2'
            ],
            [
                'nombre' => 'codificacion de historias de usuario',
                'id_planificacion' => '3'
            ],
            [
                'nombre' => 'diseño de las interfaces',
                'id_planificacion' => '1'
            ],
            [
                'nombre' => 'diseño de las interfaces',
                'id_planificacion' => '2'
            ],
            [
                'nombre' => 'diseño de las interfaces',
                'id_planificacion' => '3'
            ],[
                'nombre' => 'poblar la base de datos',
                'id_planificacion' => '1'
            ],
            [
                'nombre' => 'poblar la base de datos',
                'id_planificacion' => '2'
            ],
            [
                'nombre' => 'poblar la base de datos',
                'id_planificacion' => '3'
            ],
        ]);
    }
}
