<?php

use App\Http\Controllers\AsistenciaEvaluacion;
use App\Http\Controllers\AsistenciaEvaluacionController;
use App\Http\Controllers\AsistenciaPlanillaSeguimiento;
use App\Http\Controllers\AsistenciaPlanillaSeguimientoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DocenteController;
use App\Http\Controllers\EmpresaController;
use App\Http\Controllers\EvaluacionController;
use App\Http\Controllers\ItemPlanificacionController;
use App\Http\Controllers\ItemPlanillaController;
use App\Http\Controllers\PlanificacionController;
use App\Http\Controllers\PlanillaSeguimientoController;
use App\Http\Controllers\PlanillaController;
use App\Http\Controllers\ProyectoEmpresaController;
use App\Http\Controllers\RevisionPlanificacionController;
use App\Http\Controllers\TareaController; //vetdy ultima coneccion octubre
use App\Http\Controllers\TipoEvaluacionController;
use App\Models\Planificacion;
use Monolog\Handler\RotatingFileHandler;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::controller(DocenteController::class)->group(function () {
    Route::get('/docente', 'index');
    Route::post('/docente', 'store');
    Route::get('/docente/{id}', 'show');
    Route::put('/docente/{id}', 'update');
    Route::delete('/docente/{id}', 'destroy');
});

Route::controller(EmpresaController::class)->group(function () {
    Route::get('/empresa', 'index');
    Route::post('/empresa', 'store');
    Route::get('/empresa/{id}', 'show');
    Route::put('/empresa/{id}', 'update');
    Route::delete('/empresa/{id}', 'destroy');

    Route::get('/empresa/docente/{id}','show_docente');
});

Route::controller(PlanillaSeguimientoController::class)->group(function () {
    Route::get('/planilla_seguimiento', 'index');
    Route::post('/planilla_seguimiento', 'store');
    Route::get('/planilla_seguimiento/{id}', 'show');
    Route::put('/planilla_seguimiento/{id}', 'update');
    Route::delete('/planilla_seguimiento/{id}', 'destroy');

    Route::get('/planilla_seguimiento/proyecto_empresa/{id}', 'show_proyecto_empresa');
    Route::get('/planilla_seguimiento/semana/{idUsuario}', 'show_semanal');
    Route::get('/planilla_seguimiento/asistencia/{id}', 'show_asistencia');
    Route::patch('/planilla_seguimiento/crear/{id}','create_planilla');
});

Route::controller(ItemPlanillaController::class)->group(function () {
    Route::get('/item_planilla', 'index');
    Route::post('/item_planilla', 'store');
    Route::get('/item_planilla/{id}', 'show');
    Route::put('/item_planilla/{id}', 'update');
    Route::delete('/item_planilla/{id}', 'destroy');

    Route::get('/item_planilla/planilla_seguimiento/{id}', 'show_planilla_seguimiento');
});

Route::controller(TareaController::class)->group(function () {
    Route::get('/tarea', 'index');
    Route::post('/tarea', 'store');
    Route::get('/tarea/{id}', 'show');
    Route::put('/tarea/{id}', 'update');
    Route::delete('/tarea/{id}', 'destroy');

    //Route::post('/tarea/lista', [TareaController::class, 'store_list']);
    Route::post('/tarea/lista', 'store_list');
    Route::get('/tarea/evaluacion/{id}', 'show_evaluacion');
    
});


Route::controller(PlanificacionController::class)->group(function () {
    Route::get('/planificacion', 'index');
    Route::post('/planificacion', 'store');
    Route::get('/planificacion/{id}', 'show');
    Route::put('/planificacion/{id}', 'update');
    Route::delete('/planificacion/{id}', 'destroy');

    Route::post('/planificacion_tareas', 'storePlanificacionTareas');
    Route::get('/planificacion/proyecto_empresa/{id}','show_observacion');
    Route::get('/planificacion/proyecto_empresa/item/{id}','show_items');
});

Route::controller(ItemPlanificacionController::class)->group(function () {
    Route::get('/item_planificacion', 'index');
    Route::post('/item_planificacion', 'store');
    Route::get('/item_planificacion/{id}', 'show');
    Route::put('/item_planificacion/{id}', 'update');
    Route::delete('/item_planificacion/{id}', 'destroy');
});

Route::controller(EvaluacionController::class)->group(function () {
    Route::get('/evaluacion', 'index');
    Route::post('/evaluacion', 'store');
    Route::get('/evaluacion/{id}', 'show');
    Route::put('/evaluacion/{id}', 'update');
    Route::delete('/evaluacion/{id}', 'destroy');

    Route::get('/evaluacion/proyecto_empresa/{id}', 'index_proyecto_empresa');
    Route::get('/evaluacion/semana/{idUsuario}', 'show_semanal');
    Route::get('/evaluacion/asistencia/{id}', 'show_asistencia');
});

Route::controller(TipoEvaluacionController::class)->group(function () {
    Route::get('/tipo_evaluacion', 'index');
    Route::post('/tipo_evaluacion', 'store');
    Route::get('/tipo_evaluacion/{id}', 'show');
    Route::put('/tipo_evaluacion/{id}', 'update');
    Route::delete('/tipo_evaluacion/{id}', 'destroy');
});

Route::controller(ProyectoEmpresaController::class)->group(function () {
    Route::get('/proyecto_empresa/empresa/{id}', 'show_empresa');
    Route::get('/proyecto_empresa/docente/{id}', 'show_docente');
});

Route::controller(AsistenciaEvaluacionController::class)->group(function () {
    
    Route::put('asistencia_evaluacion/{id}', 'update');;
});

Route::controller(AsistenciaPlanillaSeguimientoController::class)->group(function () {
    
    Route::put('/asistencia_planilla_seguimiento/{id}', 'update');;
});

Route::controller(RevisionPlanificacionController::class)->group(function () {
    Route::get('/revision_planificacion', 'index');
    Route::post('/revision_planificacion', 'store');
    Route::get('/revision_planificacion/{id}', 'show');
    Route::put('/revision_planificacion/{id}', 'update');
    Route::delete('/revision_planificacion/{id}', 'destroy');

    Route::get('/revision_planificacion/proyecto_empresa/{id}','show_proyecto_empresa');
});