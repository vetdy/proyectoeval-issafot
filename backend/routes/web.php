<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DocenteController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/api/docente',[DocenteController::class,'index']);
Route::post('/api/docente/create',[DocenteController::class, 'store']);
Route::get('/api/docente/{id}',[DocenteController::class,'show']);
Route::put('/api/docente/{id}',[DocenteController::class,'update']);
Route::delete('/api/docente/{id}',[DocenteController::class,'destroy']);
