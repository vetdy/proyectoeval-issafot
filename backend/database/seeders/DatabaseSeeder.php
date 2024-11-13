<?php

namespace Database\Seeders;

use App\Models\Planificacion;
use App\Models\Usuario;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        $this->call(RolSeeder::class);
        $this->call(EmpresaSeeder::class);
        $this->call(UsuarioSeeder::class);
        $this->call(ProyectoEmpresaSeeder::class);
        $this->call(PlanificacionSeeder::class);
        $this->call(EvaluacionSeeder::class);
        $this->call(PlanillaSeeder::class);
        
        
        $this->call(AsistenciaSeeder::class);
    }
}
