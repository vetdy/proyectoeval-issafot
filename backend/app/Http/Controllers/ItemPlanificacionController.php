<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Item_planificacion;
class ItemPlanificacionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    /**
     * @OA\Get(
     *     path="/api/item_planificacion",
     *     summary="Obtiene una lista de items planilla",
     *     tags={"Item planificaciones"},
     *     @OA\Response(
     *         response=200,
     *         description="Lista de de items planilla",
     *     )
     * )
     */
    public function index()
    {
        $item_planificacion=Item_planificacion::all();
        return response()->json(['contenido'=>compact('item_planificacion')],200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    /**
     * @OA\Post(
     *     path="/api/item_planificacion",
     *     summary="Crear un nuevo Item planificacion",
     *     tags={"Item planificaciones"},
     *
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"titulo","id_planificacion"},
     *             @OA\Property(property="titulo", type="string", example="Diseño de base de datos"),
     *             @OA\Property(property="id_planificacion", type="integer", example="1"),
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Item planificacion creado con éxito"
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
                'titulo'=>'required|max:32',
                'id_planificacion'=>'required|exists:planificaciones,id'
            ]);
            $item_planificacion=Item_planificacion::create($request->all());
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['contenido'=>$e->errors()], 422);
        }
        return response()->json(['contenido'=>compact('item_planificacion')],200);
    }

    
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
     /**
     * @OA\Get(
     *     path="/api/item_planificacion/{id}",
     *     summary="Mostar un item planificacion",
     *     tags={"Item planificaciones"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID del item planificacion",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *      ),
     *     
     *     @OA\Response(
     *         response=200,
     *         description="Datos del item planificacion"
     *     ),
     *      @OA\Response(
     *         response=404,
     *         description="item planificacion no encontrado"
     *     )
     * 
     * )
     */
    public function show($id)
    {
        $item_planificacion=Item_planificacion::find($id);
        if($item_planificacion){
            return response()->json(['contenido'=>compact('item_planificacion')],200);
        }else{
            return response()->json(['contenido'=>'id item planificacion no existe'],404);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    /**
     * @OA\Put(
     *     path="/api/item_planificacion/{id}",
     *     summary="Actualizar un item planilla",
     *     tags={"Item planificaciones"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID del item planificacion",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\RequestBody(
     *      required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="titulo", type="string", example="Diseño de base de datos"),
     *             @OA\Property(property="id_planificacion", type="integer", example="1"),
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="item planificacion actualizado con éxito",
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="item planificacion no encontrado"
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
                'titulo'=>'nullable|max:32',
                'id_planilla'=>'nullable|exist:planificaciones,id'
            
            ]);
        }catch (\Illuminate\Validation\ValidationException $e){
            return response()->json(['contenido'=>$e->errors()], 422);
        }
        $item_planificacion=Item_planificacion::find($id);
        if($item_planificacion){
            $item_planificacion->update($request->all());
            return response()->json(['contenido'=>'se actualizo la item planificacion'],200);
        }else{
            return response()->json(['contenido'=>'id no encontrado'],404);
        }
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    /**
     * @OA\Delete(
     *     path="/api/item_planificacion/{id}",
     *     summary="Eliminar un item planificacion",
     *     tags={"Item planificaciones"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID del item planificacion",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="item planificacion eliminado"
     *     ),
     *      @OA\Response(
     *         response=404,
     *         description="item planificacion no encontrado"
     *     )
     * 
     * )
     */
    public function destroy($id)
    {
        $item_planificacion=Item_planificacion::find($id);
        if($item_planificacion){
            $item_planificacion->delete();
            return response()->json(['contenido'=>'eliminado con exito'],200);
        }else{
            return response()->json(['contenido'=>'no existe el item planificacion'],404);
        }
    }
}
