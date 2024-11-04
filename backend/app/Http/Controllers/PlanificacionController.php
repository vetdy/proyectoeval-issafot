<?php

namespace App\Http\Controllers;

use App\Models\Item_planificacion;
use Illuminate\Http\Request;
use App\Models\Planificacion;
use Illuminate\Support\Carbon;
use App\Services\PlanificacionService;

class PlanificacionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    /**
     * @OA\Get(
     *     path="/api/planificacion",
     *     summary="Obtiene una lista de los Plantillas seguimientos",
     *     tags={"Planificaciones"},
     *     @OA\Response(
     *         response=200,
     *         description="Lista de Planificaciones"
     *      )
     *     
     * )
     */
    public function index()
    {
        $planificacion = Planificacion::all();

        return response()->json(['contenido' => compact('planificacion')], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    /**
     * @OA\Post(
     *     path="/api/planificacion",
     *     summary="Crear un nuevo Planificacion",
     *     tags={"Planificaciones"},
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
     *         description="Planificacion creada con éxito"
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Problemas con los datos ingresados"
     *     )
     * )
     */
    public function store(Request $request)
    {
        try {
            $request->validate([
                'titulo' => 'required|max:64',
                'dia_revision' => 'required|integer',
                'hora_revision' => 'required|date_format:H:i',
                'fecha_inicio' => 'required|date',
                'fecha_fin' => 'required|date',
                'id_proyecto_empresa' => 'required|exists:proyecto_empresas,id',
            ]);
            $planificacion = Planificacion::create($request->all());
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['contenido' => $e->errors()], 422);
        }
        return response()->json(['contenido' => 'se registro exitosamente la planificacion'], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    /**
     * @OA\Get(
     *     path="/api/planificacion/{id}",
     *     summary="Mostar un Planificacion",
     *     tags={"Planificaciones"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID de la Planificacion",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *      ),
     *     
     *     @OA\Response(
     *         response=200,
     *         description="Datos de la Planificacion"
     *     ),
     *      @OA\Response(
     *         response=404,
     *         description="Planificacion no encontrada"
     *     )
     * 
     * )
     */
    public function show($id)
    {
        $planificacion = Planificacion::find($id);
        if ($planificacion) {
            return response()->json(['contenido' => compact('planificacion')], 200);
        } else {
            return response()->json(['contenido' => 'id Planificacion no existe'], 404);
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
     *     path="/api/planificacion/{id}",
     *     summary="Actualizar un Planificacion",
     *     tags={"Planificaciones"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID de la Planificacion",
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
     *         description="Planificacion actualizada con éxito",
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Planificacion no encontrada"
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Problemas con los datos ingresados"
     *     )
     * )
     */
    public function update(Request $request, $id)
    {
        try {
            $request->validate([
                'titulo' => 'nullable|max:64',
                'dia_revision' => 'nullable|integer',
                'hora_revision' => 'nullable|date_format:H:i',
                'fecha_inicio' => 'nullable|date',
                'fecha_fin' => 'nullable|date',
            ]);
            $validData = $request->only(['titulo', 'dia_revision', 'hora_revision', 'fecha_inicio', 'fecha_fin']);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['contenido' => $e->errors()], 422);
        }
        $Planificacion = Planificacion::find($id);
        if ($Planificacion) {
            $Planificacion->update($validData);
            return response()->json(['contenido' => 'se actualizo a la Planificacion con exito'], 200);
        } else {
            return response()->json(['contenido' => 'el id no existe'], 404);
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
     *     path="/api/planificacion/{id}",
     *     summary="Eliminar una Planificacion",
     *     tags={"Planificaciones"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID de la Planificacion",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Planificacion eliminada "
     *     ),
     *      @OA\Response(
     *         response=404,
     *         description="Planificacion no encontrada"
     *     )
     * 
     * )
     */
    public function destroy($id)
    {
        $planificacion = Planificacion::find($id);
        if ($planificacion) {
            $planificacion->delete();
            return response()->json(['contenido' => 'eliminado con exito'], 200);
        } else {
            return response()->json(['contenido' => 'no existe la Planificacion'], 404);
        }
    }

    public function storePlanificacionTareas(Request $request)
    {
        $planifiacionService = new PlanificacionService();
        try {
            $request->validate(
                [
                    'planificacion.*.titulo' => 'required|max:64',
                    'planificacion.*.tarea.*' => 'required|max:64',
                    'planificacion.*.fecha_inicio' => 'required|date',
                    'planificacion.*.fecha_fin' => 'required|date',
                    'dia_revision' => 'required|integer',
                    'hora_revision' => 'required|date_format:H:i',
                    'id_proyecto_empresa' => 'required|exists:proyecto_empresas,id',
                ]
            );
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['contenido' => $e->errors()], 422);
        }
        foreach ($request->planificacion as $itemPlanificacion) {

            $planificacion = new Planificacion();
            $planificacion->hora_revision = $request['hora_revision'];
            $planificacion->dia_revision = $request['dia_revision'];
            $planificacion->titulo = $itemPlanificacion['titulo'];
            $planificacion->fecha_inicio = $itemPlanificacion['fecha_inicio'];
            $planificacion->fecha_fin = $itemPlanificacion['fecha_fin'];
            $planificacion->id_proyecto_empresa = $request['id_proyecto_empresa'];
            $planificacion->save();
            foreach ($itemPlanificacion['tarea'] as $tareaData) {
                $tarea = new Item_planificacion();
                $tarea['nombre'] = $tareaData;
                $tarea['id_planificacion'] = $planificacion->id;
                $tarea->save();
            }
        }
        return response()->json(['contenido' => 'se registro exitosamente la planificacion con tareas'], 200);
    }
}
