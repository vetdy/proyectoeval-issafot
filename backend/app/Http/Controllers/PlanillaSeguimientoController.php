<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Planilla_seguimiento;
use Exception;

class PlanillaSeguimientoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    /**
     * @OA\Get(
     *     path="/api/planilla_seguimiento",
     *     summary="Obtiene una lista de los planillas seguimientos",
     *     tags={"planillas Seguimientos"},
     *     @OA\Response(
     *         response=200,
     *         description="Lista de planillas seguimientos"
     *      )
     *     
     * )
     */
    public function index()
    {
        $planilla_seguimiento=Planilla_seguimiento::all();
        
        return response()->json(['contenido'=>compact('planilla_seguimiento')],200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    /**
     * @OA\Post(
     *     path="/api/planilla_seguimiento",
     *     summary="Crear un nuevo planilla Seguimiento",
     *     tags={"planillas Seguimientos"},
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
     *         description="planilla Seguimiento creado con éxito"
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
            $planilla_seguimiento = Planilla_seguimiento::create($request->all());
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(["contenido"=>$e->errors()], 422);
        }
        return response()->json(['contenido'=>'se registro exitosamente a la planilla seguimiento'],200);
        
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    /**
     * @OA\Get(
     *     path="/api/planilla_seguimiento/{id}",
     *     summary="Mostar un planilla Seguimiento",
     *     tags={"planillas Seguimientos"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID del planilla Seguimiento",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *      ),
     *     
     *     @OA\Response(
     *         response=200,
     *         description="Datos del planilla Seguimiento"
     *     ),
     *      @OA\Response(
     *         response=404,
     *         description="planilla Seguimiento no encontrado"
     *     )
     * 
     * )
     */
    public function show($id)
    {
        $planilla_seguimiento=Planilla_seguimiento::find($id);
        if($planilla_seguimiento){
            return response()->json(['contenido'=>compact('planilla_seguimiento')],200);
        }else{
            return response()->json(['contenido'=>'id planilla seguimiento no existe'],404);
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
     *     path="/api/planilla_seguimiento/{id}",
     *     summary="Actualizar un planilla Seguimiento",
     *     tags={"planillas Seguimientos"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID del planilla Seguimiento",
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
     *         description="planilla Seguimiento actualizado con éxito",
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="planilla Seguimiento no encontrado"
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
                'titulo'=>'nullable|max:64',
                'fecha_revision'=>'nullable|date',
                'hora_revision'=>'nullable|date_format:H:i',
                'id_empresa'=>'nullable|exists:empresas,id'
            ]);
            
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(["contenido"=>$e->errors()], 422);
        }
        $planilla_seguimiento=Planilla_seguimiento::find($id);
        
            
        if($planilla_seguimiento){
            $planilla_seguimiento->update($request->all());
            return response()->json(['contenido'=>'se actualizo a la planilla_seguimiento con exito'],200);
        }else{
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
     *     path="/api/planilla_seguimiento/{id}",
     *     summary="Eliminar un planilla Seguimiento",
     *     tags={"planillas Seguimientos"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID del planilla Seguimiento",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="planilla Seguimiento eliminado"
     *     ),
     *      @OA\Response(
     *         response=404,
     *         description="planilla Seguimiento no encontrado"
     *     )
     * 
     * )
     */
    public function destroy($id)
    {
        $planilla_seguimiento=Planilla_seguimiento::find($id);
       
        if ($planilla_seguimiento){
            $planilla_seguimiento->delete();
            return response()->json(['contenido'=>'eliminado con exito'],200);
        }else{
            return response()->json(['contenido'=>'no existe la planilla seguimiento'],404);
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
     *     path="/api/planilla_seguimiento/empresa/{id}",
     *     summary="Mostar un planilla Seguimiento",
     *     tags={"planillas Seguimientos"},
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
     *         description="Datos del planilla Seguimiento por empresa"
     *     ),
     *      @OA\Response(
     *         response=404,
     *         description="Empresa no encontrada"
     *     )
     * 
     * )
     */
    public function show_empresa($id)
    {
        $planilla_seguimiento=Planilla_seguimiento::where('id_empresa', $id)->get();;
        if(!$planilla_seguimiento->isEmpty()){
            return response()->json(['contenido'=>compact('planilla_seguimiento')],200);
        }else{
            return response()->json(['contenido'=>'id empresa no existe'],404);
        }
        
    }
}
