<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DocenteController;
use App\Http\Controllers\EmpresaController;
use App\Http\Controllers\ItemPlantillaController;
use App\Http\Controllers\PlantillaSeguimientoController;
use App\Http\Controllers\PlantillaController;
use App\Http\Controllers\TareaController;
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
});

Route::controller(PlantillaSeguimientoController::class)->group(function () {
    Route::get('/plantilla_seguimiento', 'index');
    Route::post('/plantilla_seguimiento', 'store');
    Route::get('/plantilla_seguimiento/{id}', 'show');
    Route::put('/plantilla_seguimiento/{id}', 'update');
    Route::delete('/plantilla_seguimiento/{id}', 'destroy');
});

Route::controller(ItemPlantillaController::class)->group(function () {
    Route::get('/item_plantilla', 'index');
    Route::post('/item_plantilla', 'store');
    Route::get('/item_plantilla/{id}', 'show');
    Route::put('/item_plantilla/{id}', 'update');
    Route::delete('/item_plantilla/{id}', 'destroy');
});

Route::controller(TareaController::class)->group(function () {
    Route::get('/tarea', 'index');
    Route::post('/tarea', 'store');
    Route::get('/tarea/{id}', 'show');
    Route::put('/tarea/{id}', 'update');
    Route::delete('/tarea/{id}', 'destroy');
});
