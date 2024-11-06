<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use \Illuminate\Support\Facades\DB;

class EvaluacionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('tipo_evaluacions')->insert([
            [
                'nombre' => 'presencial',
                'descripcion' => 'en la presencia de cara cara'
            ],
            [
                'nombre' => 'mixta',
                'descripcion' => 'se cambia los entre estudiantes de distintos grupos TIS'
            ],
            [
                'nombre' => 'pares',
                'descripcion' => 'se cambia entre los pares'
            ]
        ]);
        DB::table('evaluacions')->insert([
            [
                'titulo' => 'evaluacion uno',
                'fecha_revision' => '2024/11/1',
                'hora_revision' => '18:00',
                'concluido' => false,
                'nota' => 20,
                'id_proyecto_empresa' => '1',
                'id_tipo_evaluacion' => '2'
            ],
            [
                'titulo' => 'evaluacion dos',
                'fecha_revision' => '2024/10/29',
                'hora_revision' => '15:00',
                'concluido' => false,
                'nota' => 20,
                'id_proyecto_empresa' => '1',
                'id_tipo_evaluacion' => '2'
            ],
            [
                'titulo' => 'evaluacion tres',
                'fecha_revision' => '2024/10/11',
                'hora_revision' => '20:00',
                'concluido' => false,
                'nota' => 20,
                'id_proyecto_empresa' => '1',
                'id_tipo_evaluacion' => '2'
            ],
        ]);
    }
}
