<?php

namespace App\Http\Controllers;

use App\Models\Tipo_evaluacion;
use Illuminate\Http\Request;

class TipoEvaluacionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    /**
     * @OA\Get(
     *     path="/api/tipo_evaluacion",
     *     summary="Obtiene una lista de items planilla",
     *     tags={"Tipo Evaluaciones"},
     *     @OA\Response(
     *         response=200,
     *         description="Lista de de items planilla",
     *     )
     * )
     */
    public function index()
    {
        $tipo_evaluacion=Tipo_evaluacion::all();
        return response()->json(['contenido'=>compact('tipo_evaluacion')],200);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    /**
     * @OA\Post(
     *     path="/api/tipo_evaluacion",
     *     summary="Crear un nuevo tipo evaluacion",
     *     tags={"Tipo Evaluaciones"},
     *
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"nombre","descripcion"},
     *             @OA\Property(property="nombre", type="string", example="Evaluacion grupal"),
     *             @OA\Property(property="descripcion", type="string", example="evaluacion entre miembros del mismo equipo"),
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="tipo evaluacion creado con éxito"
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Problemas con los datos ingresados"
     *     )
     * )
     */
    public function store(Request $request)
    {
        try{
            $request->validate([
                'nombre'=>'required|max:32',
                'descripcion'=>'required|max:252'
            ]);
            $tipo_evaluacion=Tipo_evaluacion::create($request->all());
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['contenido'=>$e->errors()], 422);
        }
        return response()->json(['contenido'=>compact('tipo_evaluacion')],200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Tipo_evaluacion  $tipo_evaluacion
     * @return \Illuminate\Http\Response
     */
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
     /**
     * @OA\Get(
     *     path="/api/tipo_evaluacion/{id}",
     *     summary="Mostar un tipo evaluacion",
     *     tags={"Tipo Evaluaciones"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID del tipo evaluacion",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *      ),
     *     
     *     @OA\Response(
     *         response=200,
     *         description="Datos del tipo evaluacion"
     *     ),
     *      @OA\Response(
     *         response=404,
     *         description="tipo evaluacion no encontrado"
     *     )
     * 
     * )
     */
    public function show($id)
    {
        $tipo_evaluacion=Tipo_evaluacion::find($id);
        if($tipo_evaluacion){
            return response()->json(['contenido'=>compact('tipo_evaluacion')],200);
        }else{
            return response()->json(['contenido'=>'id tipo evaluacion no existe'],404);
        }
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Tipo_evaluacion  $tipo_evaluacion
     * @return \Illuminate\Http\Response
     */
    /**
     * @OA\Put(
     *     path="/api/tipo_evaluacion/{id}",
     *     summary="Actualizar un item planilla",
     *     tags={"Tipo Evaluaciones"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID del tipo evaluacion",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\RequestBody(
     *      required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="nombre", type="string", example="Evaluacion grupal"),
     *             @OA\Property(property="descripcion", type="string", example="evaluacion entre miembros del mismo equipo"),
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="tipo evaluacion actualizado con éxito",
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="tipo evaluacion no encontrado"
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Problemas con los datos ingresados"
     *     )
     * )
     */
    public function update(Request $request, $id)
    { 
        try{
            $request->validate([
                'nombre'=>'required|max:32',
                'descripcion'=>'required|max:252'
            ]);
        }catch (\Illuminate\Validation\ValidationException $e){
            return response()->json(['contenido'=>$e->errors()], 422);
        }
        $tipo_evaluacion=Tipo_evaluacion::find($id);
        if($tipo_evaluacion){
            $tipo_evaluacion->update($request->all());
            return response()->json(['contenido'=>'se actualizo el tipo evaluacion'],200);
        }else{
            return response()->json(['contenido'=>'id no encontrado'],404);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Tipo_evaluacion  $tipo_evaluacion
     * @return \Illuminate\Http\Response
     */
    /**
     * @OA\Delete(
     *     path="/api/tipo_evaluacion/{id}",
     *     summary="Eliminar un tipo evaluacion",
     *     tags={"Tipo Evaluaciones"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID del tipo evaluacion",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="tipo evaluacion eliminado"
     *     ),
     *      @OA\Response(
     *         response=404,
     *         description="tipo evaluacion no encontrado"
     *     )
     * 
     * )
     */
    public function destroy($id)
    {
        $tipo_evaluacion=tipo_evaluacion::find($id);
        if($tipo_evaluacion){
            $tipo_evaluacion->delete();
            return response()->json(['contenido'=>'eliminado con exito'],200);
        }else{
            return response()->json(['contenido'=>'no existe el tipo evaluacion'],404);
        }
    }
}
