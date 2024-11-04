<?php

namespace App\Http\Controllers;

use App\Models\Asistencia_planilla_seguimiento;
use App\Models\Empresa;
use App\Models\Planificacion;
use Illuminate\Http\Request;
use App\Models\Planilla_seguimiento;
use App\Models\Proyecto;
use App\Models\Proyecto_empresa;
use App\Models\Usuario;
use App\Services\PlanillaSeguimientoService;
use Carbon\Carbon;
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
        $planilla_seguimiento = Planilla_seguimiento::all();

        return response()->json(['contenido' => compact('planilla_seguimiento')], 200);
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
        try {
            $request->validate([
                'titulo' => 'required|max:64',
                'fecha_revision' => 'required|date',
                'hora_revision' => 'required|date_format:H:i',
                'id_proyecto_empresa' => 'required|exists:empresas,id'
            ]);
            $planilla_seguimiento = Planilla_seguimiento::create($request->all());
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(["contenido" => $e->errors()], 422);
        }
        return response()->json(['contenido' => 'se registro exitosamente a la planilla seguimiento'], 200);
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
        $planilla_seguimiento = Planilla_seguimiento::find($id);
        if ($planilla_seguimiento) {
            return response()->json(['contenido' => compact('planilla_seguimiento')], 200);
        } else {
            return response()->json(['contenido' => 'id planilla seguimiento no existe'], 404);
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

        try {
            $request->validate([
                'titulo' => 'nullable|max:64',
                'fecha_revision' => 'nullable|date',
                'hora_revision' => 'nullable|date_format:H:i',
            ]);
            $data = $request->only(['titulo', 'fecha_revision', 'hora_revision']);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(["contenido" => $e->errors()], 422);
        }
        $planilla_seguimiento = Planilla_seguimiento::find($id);


        if ($planilla_seguimiento) {
            $planilla_seguimiento->update($data);
            return response()->json(['contenido' => 'se actualizo a la planilla_seguimiento con exito'], 200);
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
        $planilla_seguimiento = Planilla_seguimiento::find($id);

        if ($planilla_seguimiento) {
            $planilla_seguimiento->delete();
            return response()->json(['contenido' => 'eliminado con exito'], 200);
        } else {
            return response()->json(['contenido' => 'no existe la planilla seguimiento'], 404);
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
        $planilla_seguimiento = Planilla_seguimiento::where('id_proyecto_empresa', $id)->get();;
        if (!$planilla_seguimiento->isEmpty()) {
            $idEmpresa = Proyecto_empresa::find($id);
            $nombre_empresa = Empresa::find($idEmpresa->id_empresa)->nombre_corto;
            return response()->json(['contenido' => compact('planilla_seguimiento', 'nombre_empresa')], 200);
        } else {
            return response()->json(['contenido' => 'id empresa no existe'], 404);
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
            $planillas_seguimientos = [];
            foreach ($proyectos as $proyecto) {


                $protectoEmpresa = Proyecto_empresa::where('id_proyecto', $proyecto->id)->get();
                foreach ($protectoEmpresa as $proyect) {
                    $usuario = Planilla_seguimiento::where('id_proyecto_empresa', $proyect->id)->get();
                    foreach ($usuario as $usua) {

                        $fechaActual = Carbon::now();
                        // Calcula el inicio de la semana (lunes) y el fin de la semana (domingo)
                        $inicioDeSemana = $fechaActual->copy()->startOfWeek();
                        $finDeSemana = $fechaActual->copy()->endOfWeek();
                        $fecha_a_verificar = Carbon::parse($usua->fecha_revision);
                        if ($fecha_a_verificar->between($inicioDeSemana, $finDeSemana)) {

                            $nombre_empresa = Empresa::find($proyect->id_empresa)->nombre_corto;
                            $usua->nombre_empresa = $nombre_empresa;
                            $planillas_seguimientos[] = $usua;
                        }
                    }
                }
            }
            return response()->json(['contenido' => compact('planillas_seguimientos')], 200);
        } else {
            return response()->json(['contenido' => 'el usuario no tiene Proyectos activos'], 404);
        }
    }

    /**
     * @OA\Get(
     *     path="/api/planilla_seguimiento/asistencia/",
     *     summary="Mostar planillas Seguimientos con asistencia",
     *     tags={"planillas Seguimientos"},
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

        $planilla_seguimiento = Planilla_seguimiento::find($id);
        if ($planilla_seguimiento) {
            $usuarios = Asistencia_planilla_seguimiento::where('id_planilla_seguimiento', $id)->get();

            foreach ($usuarios as $us) {
                $aux = Usuario::find($us->id_usuario);
                $us->nombre_usuario = $aux->nombre . ' ' . $aux->apellido;
            }
            $proyecto_empresa = Proyecto_empresa::find($planilla_seguimiento->id_proyecto_empresa);


            $logo = Empresa::find($proyecto_empresa->id_empresa)->url_logo;
            $nombre_corto = Empresa::find($proyecto_empresa->id)->nombre_corto;
            return response()->json(['contenido' => compact('usuarios', 'proyecto_empresa', 'logo', 'nombre_corto')]);
        } else {
            return response()->json(['contenido' => 'id de la planilla seguimiento no encontrado'], 404);
        }
    }
    /**
     * @OA\Pacth( 
     *     path="/api/planilla_seguimiento/general/{idEmpresa}",
     *     summary="Generar planillas Seguimientos con la empresa",
     *     tags={"planillas Seguimientos"},
     *     @OA\Parameter(
     *         name="idGrupoEmpresa",
     *         in="path",
     *         description="ID de la empresa",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *      ),
     *     
     *     @OA\Response(
     *         response=200,
     *         description="planillas Seguimiento creados"
     *     ),
     *      @OA\Response(
     *         response=404,
     *         description="grupo empresa no encontrado"
     *     )
     * 
     * )
     */
    public function create_planilla($id)
    {
        $planillaSeguimientoService=new PlanillaSeguimientoService;
        $proyecto_empresas =Proyecto_empresa::where('id_empresa',$id)->get();
        if (!$proyecto_empresas->isEmpty()) {    
            foreach ($proyecto_empresas as $proyecto_empresa){
                foreach (Planificacion::where('id_proyecto_empresa',$proyecto_empresa->id)->get() as $planificacion){
                    $planillaSeguimientoService->registarPlanillaSeguimiento($planificacion);
                }

            }
            return response()->json(['contenido' => "planillas de seguimientos creadas"]);
        } else {
            return response()->json(['contenido' => 'id del grupo empresa no encontrado'], 404);
        }
    } 
}
