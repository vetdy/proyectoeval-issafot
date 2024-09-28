<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DocenteController;
use App\Http\Controllers\EmpresaController;

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
Route::get('/docente',[DocenteController::class,'index']);
Route::post('/docente/create',[DocenteController::class, 'store']);
Route::get('/docente/{id}',[DocenteController::class,'show']);
Route::put('/docente/{id}',[DocenteController::class,'update']);
Route::delete('/docente/{id}',[DocenteController::class,'destroy']);

Route::get('/empresa',[EmpresaController::class,'index']);
Route::post('/empresa/create',[EmpresaController::class, 'store']);
Route::get('/empresa/{id}',[EmpresaController::class,'show']);
Route::put('/empresa/{id}',[EmpresaController::class,'update']);
Route::delete('/empresa/{id}',[EmpresaController::class,'destroy']);