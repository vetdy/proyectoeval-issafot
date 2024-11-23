<?php

namespace App\Http\Controllers;

use App\Models\Asistencia_evaluacion;
use App\Models\Empresa;
use Illuminate\Http\Request;
use App\Models\Evaluacion;
use App\Models\Proyecto;
use App\Models\Proyecto_empresa;
use App\Models\Usuario;
use Carbon\Carbon;

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

        $evaluacion = Evaluacion::all();
        return response()->json(['contenido' => compact('evaluacion')], 200);
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
     *             required={"titulo","fecha_revision","hora_revision","concluido","nota","id_empresa","id_tipo_evaluacion"},
     *             @OA\Property(property="titulo", type="string", example="Item 1"),
     *             @OA\Property(property="fecha_revision", type="date", example="2024/10/21"),
     *             @OA\Property(property="hora_revision", type="time", example="18:00"),
     *             @OA\Property(property="nota", type="integer", example="50"),
     *             @OA\Property(property="id_empresa", type="integer", example="1"),
     *             @OA\Property(property="id_tipo_evaluacion", type="integer", example="2"),
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
        try {
            $request->validate([
                'titulo' => 'required|max:64',
                'fecha_revision' => 'required|date',
                'hora_revision' => 'required|date_format:H:i',
                'concluido' => 'required|boolean',
                'nota' => 'required|integer',
                'id_proyecto_empresa' => 'required|exists:proyecto_empresas,id',
                'id_tipo_evaluacion' => 'required|exists:tipo_evaluacions,id',
            ]);
            $evaluacion = Evaluacion::create($request->all());
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['contenido' => $e->errors()], 422);
        }
        return response()->json(['contenido' => 'se registro exitosamente la evaluacion'], 200);
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
        $evaluacion = Evaluacion::find($id);
        if ($evaluacion) {
            return response()->json(['contenido' => compact('evaluacion')], 200);
        } else {
            return response()->json(['contenido' => 'id evaluacion no existe'], 404);
        }
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
     *             @OA\Property(property="fecha_revision", type="date", example="2024/10/21"),
     *             @OA\Property(property="hora_revision", type="time", example="18:00"),
     *             @OA\Property(property="nota", type="integer", example="50"),
     *             @OA\Property(property="id_empresa", type="integer", example="1"),
     *             @OA\Property(property="id_tipo_evaluacion", type="integer", example="2"),
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
        try {
            $request->validate([
                'titulo' => 'nullable|max:64',
                'fecha_revision' => 'nullable|date',
                'hora_revision' => 'nullable|date_format:H:i',
                'concluido' => 'nullable|boolean',
                'nota' => 'nullable|integer',
                'id_tipo_evaluacion' => 'nullable|exists:tipo_evaluacions,id',
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['contenido' => $e->errors()], 422);
        }
        $evaluacion = evaluacion::find($id);
        if ($evaluacion) {
            $evaluacion->update($request->all());
            return response()->json(['contenido' => 'se actualizo a la evaluacion con exito'], 200);
        } else {
            return response()->json(['contenido' => 'el id no existe'], 404);
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
        $evaluacion = Evaluacion::find($id);
        if ($evaluacion) {
            $evaluacion->delete();
            return response()->json(['contenido' => 'eliminado con exito'], 200);
        } else {
            return response()->json(['contenido' => 'no existe la evaluacion'], 404);
        }
    }
    /**
     * @OA\Delete(
     *     path="/api/evaluacion/empresa/{id}",
     *     summary="Mostar una evaluaciones por empresa",
     *     tags={"Evaluaciones"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID de la empresa",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="muestra evaluacion "
     *     ),
     *      @OA\Response(
     *         response=404,
     *         description="evaluacion no encontrada"
     *     )
     * 
     * )
     */


    public function index_proyecto_empresa($id)
    {
        $evaluacion_empresa=[];
        $proyectoEmpresas = Proyecto_empresa::where('id_empresa', $id)->get();
        if (!$proyectoEmpresas->isEmpty()) {
            foreach ($proyectoEmpresas as $proyectoEmpresa){
                $evaluacion_empresa[]=Evaluacion::where('id_proyecto_empresa',$proyectoEmpresa->id)->groupBy('id')->get();
            }
            return response()->json(['contenido' => compact('evaluacion_empresa')], 200);
        } else {
            return response()->json(['contenido' => 'no existe la evaluacion'], 404);
        }
    }

    /**
     * @OA\Get( 
     *     path="/api/planilla_seguimiento/semanal/{idUsuario}",
     *     summary="Mostar planillas Seguimientos por docente",
     *     tags={"planillas Seguimientos"},
     *     @OA\Parameter(
     *         name="idUsuario",
     *         in="path",
     *         description="ID de el docente",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *      ),
     *     
     *     @OA\Response(
     *         response=200,
     *         description="Datos del planilla Seguimiento por docente"
     *     ),
     *      @OA\Response(
     *         response=404,
     *         description="docente no encontrada"
     *     )
     * 
     * )
     */
    public function show_semanal($idUsuario)
    {

        $proyectos = Proyecto::where('id_creado_por', $idUsuario)->get();
        if (!$proyectos->isEmpty()) {
            $evaluacions = [];
            foreach ($proyectos as $proyecto) {
                $protectoEmpresa = Proyecto_empresa::where('id_proyecto', $proyecto->id)->groupBy('id')->get();
                foreach ($protectoEmpresa as $proyect) {
                    $usuario = Evaluacion::where('id_proyecto_empresa', $proyect->id)->groupBy('id')->get();
                    foreach ($usuario as $usua) {

                        $fechaActual = Carbon::now();
                        // Calcula el inicio de la semana (lunes) y el fin de la semana (domingo)
                        $inicioDeSemana = $fechaActual->copy()->startOfWeek();
                        $finDeSemana = $fechaActual->copy()->endOfWeek();
                        $fecha_a_verificar = Carbon::parse($usua->fecha_revision);
                        if ($fecha_a_verificar->between($inicioDeSemana, $finDeSemana)) {

                            $nombre_empresa = Empresa::find($proyect->id_empresa)->nombre_corto;
                            $usua->nombre_empresa = $nombre_empresa;
                            $evaluacions[] = $usua;
                        }
                    }
                }
            }
            return response()->json(['contenido' => compact('evaluacions')], 200);
        } else {
            return response()->json(['contenido' => 'el usuario no tiene Proyectos activos'], 404);
        }
    }

    /**
     * @OA\Get(
     *     path="/api/evaluacion/asistencia/",
     *     summary="Mostar planillas Seguimientos con asistencia",
     *     tags={"Evaluacion"},
     *     @OA\Parameter(
     *         name="idUsuario",
     *         in="path",
     *         description="ID de la plantilla",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *      ),
     *     
     *     @OA\Response(
     *         response=200,
     *         description="Datos del planilla Seguimiento con asistencia"
     *     ),
     *      @OA\Response(
     *         response=404,
     *         description="planilla no encontrada"
     *     )
     * 
     * )
     */

     public function show_asistencia($id)
     {
 
         $evaluacion = Evaluacion::find($id);
         if ($evaluacion) {
             $usuarios = Asistencia_evaluacion::where('id_evaluacion', $id)->groupBy('id')->get();
 
             foreach ($usuarios as $us) {
                 $aux = Usuario::find($us->id_usuario);
                 $us->nombre_usuario = $aux->nombre . ' ' . $aux->apellido;
             }
             $proyecto_empresa = Proyecto_empresa::find($evaluacion->id_proyecto_empresa);
 
 
             $logo = Empresa::find($proyecto_empresa->id_empresa)->url_logo;
             $nombre_corto = Empresa::find($proyecto_empresa->id)->nombre_corto;
             return response()->json(['contenido' => compact('usuarios', 'proyecto_empresa', 'logo', 'nombre_corto')]);
         } else {
             return response()->json(['contenido' => 'id de la planilla seguimiento no encontrado'], 404);
         }
     }
}
