<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Plantilla_seguimiento;
use Exception;

class PlantillaSeguimientoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    /**
     * @OA\Get(
     *     path="/api/plantilla_seguimiento",
     *     summary="Obtiene una lista de los Plantillas seguimientos",
     *     tags={"Plantillas Seguimientos"},
     *     @OA\Response(
     *         response=200,
     *         description="Lista de Plantillas seguimientos"
     *      )
     *     
     * )
     */
    public function index()
    {
        $plantilla_seguimiento=Plantilla_seguimiento::all();
        
        return response()->json(['contenido'=>compact('plantilla_seguimiento')],200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    /**
     * @OA\Post(
     *     path="/api/plantilla_seguimiento",
     *     summary="Crear un nuevo Plantilla Seguimiento",
     *     tags={"Plantillas Seguimientos"},
     *
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"titulo","fecha_revision","hora_revision", "id_empresa"},
     *             @OA\Property(property="titulo", type="string", example="Item 1"),
     *             @OA\Property(property="fecha_revision", type="date", example="2024/8/10)"),
     *             @OA\Property(property="hora_revision", type="time", example="18:00"),
     *             @OA\Property(property="id_empresa", type="string", example="1"),
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Plantilla Seguimiento creado con éxito"
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
                'titulo'=>'required|max:64',
                'fecha_revision'=>'required|date',
                'hora_revision'=>'required|date_format:H:i',
                'id_empresa'=>'required|exists:empresas,id'
            ]);
            $plantilla_seguimiento = Plantilla_seguimiento::create($request->all());
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(["contenido"=>$e->errors()], 422);
        }
        return response()->json(['contenido'=>'se registro exitosamente a la plantilla seguimiento'],200);
        
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    /**
     * @OA\Get(
     *     path="/api/plantilla_seguimiento/{id}",
     *     summary="Mostar un Plantilla Seguimiento",
     *     tags={"Plantillas Seguimientos"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID del Plantilla Seguimiento",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *      ),
     *     
     *     @OA\Response(
     *         response=200,
     *         description="Datos del Plantilla Seguimiento"
     *     ),
     *      @OA\Response(
     *         response=404,
     *         description="Plantilla Seguimiento no encontrado"
     *     )
     * 
     * )
     */
    public function show($id)
    {
        $plantilla_seguimiento=Plantilla_seguimiento::find($id);
        if($plantilla_seguimiento){
            return response()->json(['contenido'=>compact('plantilla_seguimiento')],200);
        }else{
            return response()->json(['contenido'=>'id plantilla seguimiento no existe'],404);
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
     *     path="/api/plantilla_seguimiento/{id}",
     *     summary="Actualizar un Plantilla Seguimiento",
     *     tags={"Plantillas Seguimientos"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID del Plantilla Seguimiento",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\RequestBody(
     *      required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="titulo", type="string", example="Item 1"),
     *             @OA\Property(property="fecha_revision", type="date", example="2024/8/10)"),
     *             @OA\Property(property="hora_revision", type="time", example="18:00"),
     *             @OA\Property(property="id_empresa", type="string", example="1"),
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Plantilla Seguimiento actualizado con éxito",
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Plantilla Seguimiento no encontrado"
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Problemas con los datos ingresados"
     *     )
     * )
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'titulo'=>'nullable|max:64',
            'fecha_revision'=>'nullable|date',
            'hora_revision'=>'nullable|time',
            'id_empresa'=>'nullable|exists:empresas.id'
        ]);
        try{
            $plantilla_seguimiento=Plantilla_seguimiento::find($id);
            $plantilla_seguimiento->update($request->all());
            return response()->json(['contenido'=>'se actualizo a la Plantilla_seguimiento con exito'],200);
        }catch (\Illuminate\Database\QueryException $e){
            return response()->json(['contenido'=>'el id no existe'],404);
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
     *     path="/api/plantilla_seguimiento/{id}",
     *     summary="Eliminar un Plantilla Seguimiento",
     *     tags={"Plantillas Seguimientos"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID del Plantilla Seguimiento",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Plantilla Seguimiento eliminado"
     *     ),
     *      @OA\Response(
     *         response=404,
     *         description="Plantilla Seguimiento no encontrado"
     *     )
     * 
     * )
     */
    public function destroy($id)
    {
        $plantilla_seguimiento=Plantilla_seguimiento::find($id);
        $plantilla_seguimiento->delete();
        if ($plantilla_seguimiento){
            return response()->json(['contenido'=>'eliminado con exito'],200);
        }else{
            return response()->json(['contenido'=>'no existe la plantilla seguimiento'],404);
        }
    }
}
