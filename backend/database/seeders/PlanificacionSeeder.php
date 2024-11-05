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
                'titulo' => 'presencial',
                'fecha_inicio' => '2024/10/28',
                'fecha_fin' => '2019/11/6',
                'dia_revision' => 2,
                'hora_revision' => '11:00',
                'id_proyecto_empresa' => '2',
                'id_estado_planificacion'=>1
            ],
            [
                'titulo' => 'plan 1',
                'fecha_inicio' => '2024/10/29',
                'fecha_fin' => '2019/11/7',
                'dia_revision' => 2,
                'hora_revision' => '11:30',
                'id_proyecto_empresa' => '1',
                'id_estado_planificacion'=>1
            ],
            [
                'titulo' => 'plan 2',
                'dia_revision' => '2',
                'hora_revision' => '12:00',
                'fecha_inicio' => '2024/11/1',
                'fecha_fin' => '2019/11/8',
                'id_proyecto_empresa' => '1',
                'id_estado_planificacion'=>1    
            ],

        ]);
        DB::table('item_planificacion')->insert([
            [
                'nombre' => 'product backlog',
                'id_planificacion' => '2'
            ],
            [
                'nombre' => 'sprint backlog',
                'id_planificacion' => '1'
            ],
            [
                'nombre' => 'historia de usuario',
                'id_planificacion' => '2'
            ],
        ]);
    }
}
