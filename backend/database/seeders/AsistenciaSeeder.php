<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AsistenciaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('asistencia_planilla_seguimiento')->insert([
            [
                'presente' => true,
                'observacion' => 'en la presencia de cara cara',
                'id_planilla_seguimiento' => 2,
                'id_usuario' => 1
            ],
            [
                'presente' => false,
                'observacion' => 'en la presencia de cara cara',
                'id_planilla_seguimiento' => 2,
                'id_usuario' => 2
            ],
            [
                'presente' => false,
                'observacion' => 'en la presencia de cara cara',
                'id_planilla_seguimiento' => 2,
                'id_usuario' => 3
            ],
        ]);

        DB::table('asistencia_evaluacion')->insert([
            [
                'presente' => true,
                'observacion' => 'en la presencia de cara cara',
                'id_evaluacion' => 2,
                'id_usuario' => 1
            ],
            [
                'presente' => false,
                'observacion' => 'en la presencia de cara cara',
                'id_evaluacion' => 2,
                'id_usuario' => 2
            ],
            [
                'presente' => false,
                'observacion' => 'en la presencia de cara cara',
                'id_evaluacion' => 2,
                'id_usuario' => 3
            ],
        ]);
    }
}
