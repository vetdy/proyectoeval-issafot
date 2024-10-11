<?php

namespace App\Http\Controllers;

use App\Models\Item_plantilla;
use Illuminate\Cache\Repository;
use Illuminate\Http\Request;

class ItemPlantillaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    /**
     * @OA\Get(
     *     path="/api/item_plantilla",
     *     summary="Obtiene una lista de items planilla",
     *     tags={"Item Plantillas"},
     *     @OA\Response(
     *         response=200,
     *         description="Lista de de items planilla",
     *     )
     * )
     */
    public function index()
    {
        $item_plantilla=Item_plantilla::all();
        return response()->json(['contenido'=>compact('item_plantilla')],200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    /**
     * @OA\Post(
     *     path="/api/item_plantilla",
     *     summary="Crear un nuevo Item Plantilla",
     *     tags={"Item Plantillas"},
     *
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"titulo","id_plantilla"},
     *             @OA\Property(property="titulo", type="string", example="Diseño de base de datos"),
     *             @OA\Property(property="id_plantilla", type="integer", example="1"),
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Item Plantilla creado con éxito"
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
                'id_plantilla'=>'required|exists:plantilla_seguimientos,id'
            ]);
            $item_plantilla=Item_plantilla::create($request->all());
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['contenido'=>$e->errors()], 422);
        }
        return response()->json(['contenido'=>compact('item_plantilla')],200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\item_plantilla  $item_plantilla
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
     *     path="/api/item_plantilla/{id}",
     *     summary="Mostar un item plantilla",
     *     tags={"Item Plantillas"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID del item plantilla",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *      ),
     *     
     *     @OA\Response(
     *         response=200,
     *         description="Datos del item plantilla"
     *     ),
     *      @OA\Response(
     *         response=404,
     *         description="item plantilla no encontrado"
     *     )
     * 
     * )
     */
    public function show($id)
    {
        $item_plantilla=Item_plantilla::find($id);
        if($item_plantilla){
            return response()->json(['contenido'=>compact('item_plantilla')],200);
        }else{
            return response()->json(['contenido'=>'id item plantilla no existe'],404);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\item_plantilla  $item_plantilla
     * @return \Illuminate\Http\Response
     */
     /**
     * @OA\Put(
     *     path="/api/item_plantilla/{id}",
     *     summary="Actualizar un item planilla",
     *     tags={"Item Plantillas"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID del item plantilla",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\RequestBody(
     *      required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="titulo", type="string", example="Diseño de base de datos"),
     *             @OA\Property(property="id_plantilla", type="integer", example="1"),
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="item plantilla actualizado con éxito",
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="item plantilla no encontrado"
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
                'id_planilla'=>'nullable|exists:plantillas_segimientos.id'
            
            ]);
        }catch (\Illuminate\Validation\ValidationException $e){
            return response()->json(['contenido'=>$e->errors()], 422);
        }
        $item_plantilla=Item_plantilla::find($id);
        if($item_plantilla){
            $item_plantilla->update($request->all());
            return response()->json(['contenido'=>'se actualizo la item plantilla'],200);
        }else{
            return response()->json(['contenido'=>'id no encontrado'],404);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\item_plantilla  $item_plantilla
     * @return \Illuminate\Http\Response
     */
    /**
     * @OA\Delete(
     *     path="/api/item_plantilla/{id}",
     *     summary="Eliminar un item plantilla",
     *     tags={"Item Plantillas"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID del item plantilla",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="item plantilla eliminado"
     *     ),
     *      @OA\Response(
     *         response=404,
     *         description="item plantilla no encontrado"
     *     )
     * 
     * )
     */
    public function destroy($id)
    {
        $item_plantilla=Item_plantilla::find($id);
        if($item_plantilla){
            $item_plantilla->delete();
            return response()->json(['contenido'=>'eliminado con exito'],200);
        }else{
            return response()->json(['contenido'=>'no existe el item plantilla'],404);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    /**
     * @OA\Get(
     *     path="/api/item_plantilla/plantilla_seguimiento/{id}",
     *     summary="Mostar una lista item planilla por plantilla seguimiento",
     *     tags={"Plantillas Seguimientos"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID del empresa",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *      ),
     *     
     *     @OA\Response(
     *         response=200,
     *         description="Datos del item planilla por plantilla seguimiento"
     *     ),
     *      @OA\Response(
     *         response=404,
     *         description="plantilla no encontrada"
     *     )
     * 
     * )
     */
    public function show_plantilla_seguimiento($id)
    {
        $item_plantilla=Item_plantilla::where('id_plantilla_seguimiento', $id)->get();;
        if(!$item_plantilla->isEmpty()){
            return response()->json(['contenido'=>compact('item_plantilla')],200);
        }else{
            return response()->json(['contenido'=>'id plantilla seguimiento no existe'],404);
        }
        
    }
}
