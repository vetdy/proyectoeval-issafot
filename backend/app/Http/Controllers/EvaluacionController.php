<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Models\Evaluacion;

class EvaluacionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    /**
     * @OA\Get(
     *     path="/api/evaluacion",
     *     summary="Obtiene una lista de los evaluacions",
     *     tags={"Evaluaciones"},
     *     @OA\Response(
     *         response=200,
     *         description="Lista de evaluacions"
     *      )
     *     
     * )
     */
    public function index()
    {
        
        $evaluacion=Evaluacion::all();
        return response()->json(['evaluacion'=>compact('evaluacion')],200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    /**
     * @OA\Post(
     *     path="/api/evaluacion",
     *     summary="Crear un nuevo evaluacion",
     *     tags={"Evaluaciones"},
     *
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"titulo","fecha_inicio","fecha_fin","id_proyecto_empresa"},
     *             @OA\Property(property="titulo", type="string", example="Item 1"),
     *             @OA\Property(property="fecha_inicio", type="date", example="2024/10/1"),
     *             @OA\Property(property="fecha_fin", type="date", example="2024/10/29"),
     *             @OA\Property(property="id_proyecto_empresa", type="integer", example="1")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="evaluacion creada con éxito"
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
            $request->validate(['titulo'=>'required|max:64',
                'fecha_revision'=>'required|date',
                'hora_revision'=>'required|date_format:H:i',
                'concluido'=>'required|boolean',
                'nota'=>'required|integer',
                'id_empresa'=>'required|exists:empresas,id',
                'id_tipo_evaluacion'=>'required|exists:tipo_evaluacions,id',
                ]);
            $evaluacion = Evaluacion::create($request->all());
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['contenido'=>$e->errors()], 422);
        }
        return response()->json(['contenido'=>'se registro exitosamente la evaluacion'],200);
   
    }
    /**
     * Display the specified resource.
     *
     * @param  \App\Models\evaluacion  $evaluacion
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
     *     path="/api/evaluacion/{id}",
     *     summary="Mostar un evaluacion",
     *     tags={"Evaluaciones"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID de la evaluacion",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *      ),
     *     
     *     @OA\Response(
     *         response=200,
     *         description="Datos de la evaluacion"
     *     ),
     *      @OA\Response(
     *         response=404,
     *         description="evaluacion no encontrada"
     *     )
     * 
     * )
     */
    public function show($id)
    {
        $evaluacion=Evaluacion::find($id);
        if($evaluacion){
            return response()->json(['contenido'=>compact('evaluacion')],200);
        }else{
            return response()->json(['contenido'=>'id evaluacion no existe'],404);}
        
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\evaluacion  $evaluacion
     * @return \Illuminate\Http\Response
     */
    /**
     * @OA\Put(
     *     path="/api/evaluacion/{id}",
     *     summary="Actualizar un evaluacion",
     *     tags={"Evaluaciones"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID de la evaluacion",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\RequestBody(
     *      required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="titulo", type="string", example="Item 1"),
     *             @OA\Property(property="fecha_inicio", type="date", example="2024/10/1"),
     *             @OA\Property(property="fecha_fin", type="date", example="2024/10/29"),
     *             @OA\Property(property="id_proyecto_empresa", type="integer", example="1")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="evaluacion actualizada con éxito",
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="evaluacion no encontrada"
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
            $request->validate(['titulo'=>'nullable|max:64',
                'fecha_revision'=>'nullable|date',
                'hora_revision'=>'nullable|date_format:H:i',
                'concluido'=>'nullable|boolean',
                'nota'=>'nullable|integer',
                'id_tipo_evaluacion'=>'nullable|exists:tipo_evaluacions,id',
                ]);
            }catch (\Illuminate\Validation\ValidationException $e){
                return response()->json(['contenido'=>$e->errors()], 422);
            }
        $evaluacion=evaluacion::find($id);
        if($evaluacion){
            $evaluacion->update($request->all());
            return response()->json(['contenido'=>'se actualizo a la evaluacion con exito'],200);
    
        }else{
            return response()->json(['contenido'=>'el id no existe'],404);
        }
 
            
        
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\evaluacion  $evaluacion
     * @return \Illuminate\Http\Response
     */
    /**
     * @OA\Delete(
     *     path="/api/evaluacion/{id}",
     *     summary="Eliminar una evaluacion",
     *     tags={"Evaluaciones"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID de la evaluacion",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="evaluacion eliminada "
     *     ),
     *      @OA\Response(
     *         response=404,
     *         description="evaluacion no encontrada"
     *     )
     * 
     * )
     */
    public function destroy($id)
    {
        $evaluacion=Evaluacion::find($id);
        if ($evaluacion){
            $evaluacion->delete();
            return response()->json(['contenido'=>'eliminado con exito'],200);
        }else{
            return response()->json(['contenido'=>'no existe la evaluacion'],404);
        }
    }
}
