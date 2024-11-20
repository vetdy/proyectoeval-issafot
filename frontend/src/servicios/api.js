import { backend as rutas } from "../rutas"
const URL_BACKEND = import.meta.env.VITE_SERVIDOR_BACKEND_URL;

export const solicitud = async (url = URL_BACKEND, metodo = "get", datos={}) => {
    try{
        const trama = {};

        const headers = {
            "Content-Type": "application/json",
            "Accept": "application/json",
        }

        trama.method = metodo;
        trama.headers = headers;

        if(Object.keys(datos).length){
            trama.body = JSON.stringify(datos);
        }

        const respuesta = await fetch(url, trama);

        const tipoRespuesta = respuesta.headers.get("content-type");

        if(! tipoRespuesta.includes("application/json") ){
            console.error(`Error del tipo de respuesta del backend: 
                Content-Type: ${tipoRespuesta}
            `);
            return {
                status: 501,
                message: "El servicio no esta implementado."
            };
        }
        
        const contenido = await respuesta.json();

        /* if(! respuesta.ok && respuesta.status !== 422){
            console.error(`Error en backend: ${respuesta.status}: ${respuesta.statusText}`);
            return {
                status: respuesta.status,
                message: respuesta.statusText,
            };
        } */
       
        if(! contenido.hasOwnProperty("contenido") ){
            const cad = Object.entries(contenido).map(([k, v]) => {return `${k}: ${v}`}).join(" ");
            console.error(
                `La respuesta no tiene contenido: ${cad}`
            );
            return {
                status: 404,
                message: "No se encuentra el contenido.",
            };
        }

        return {
            status: respuesta.status,
            message: contenido.contenido,
        };
    }
    catch(error){
        if(error instanceof SyntaxError){
            console.error(`Los datos json no son validos: ${datos}`);
            return {
                status: 422,
                message: "Los datos son invalidos.",
            }
        }
        else if(error.message.includes("Failed to fetch")){
            console.error(`No se pudo conectar con el servidor backend: ${URL_BACKEND}`);
            return {
                status: 424,
                message: "El servicio no se encuentra disponible en este momento.",
            }
        }
        else{
            console.error("Error inesperado:", error);
            return {
                status: 500,
                message: "La solicitud no se puede completar en este momento.",
            }
        }
    }
}

export const registrarEmpresa = async (datos={}) => {
    const respuesta = await solicitud(rutas.REGISTRO_EMPRESA, "POST", datos);
    return respuesta;
}

export const obtenerProyectosEmpresa = async (empresaID=1) => {
    const respuesta = await solicitud(`${rutas.PROYECTOS_EMPRESA}/${empresaID}`);
    return respuesta;
}

export const obtenerProyectosEmpresaDocente = async (docenteID) => {
    const respuesta = await solicitud(`${rutas.PROYECTOS_EMPRESA_DOCENTE}/${docenteID}`);
    return respuesta
}

export const obtenerPlanillasSeguimientoEmpresa = async (empresaID=1) => {
    const respuesta = await solicitud(`${rutas.PLANILLA_SEGUIMIENTO_EMPRESA}/${empresaID}`);
    return respuesta;
}

export const obtenerPlanillasEvaluacionEmpresa = async (empresaID = 1) => {
    const respuesta = await solicitud(`${rutas.PLANILLA_EVALUACION_EMPRESA}/${empresaID}`);
    return respuesta;
}

export const obtenerItemsPlanillaSeguimiento = async (planilla=1) => {
    const respuesta = await solicitud(`${rutas.ITEMS_PLANILLA_SEGUIMIENTO}/${planilla}`);
    return respuesta;
}

export const obtenerItemsPlanillaEvaluacion = async (planilla=1) => {
    const respuesta = await solicitud(`${rutas.ITEMS_PLANILLA_EVALUACION}/${planilla}`);
    return respuesta;
}

export const obtenerPlanificacionEmpresa = async (empresaID=1) => {
    const respuesta = await solicitud(`${rutas.PLANIFICACION_PROYECTO_EMPRESA}/${empresaID}`);
    return respuesta;
}

export const obtenerEstadoPlanificacionProyectoEmpresa = async (proyEmprID = 1) => {
    const respuesta = await solicitud(`${rutas.ESTADO_PLANIFICACION_PROYECTO_EMPRESA}/${proyEmprID}`);
    return respuesta;
}

export const actualizarRevisionPlanificacion = async (
    revisionPlanifID = 1,
    nuevoEstado = 1,
    observasion = ""
) => {
    const datos = {id_estado_planificacion: nuevoEstado};
    if(observasion){
        datos["observacion"] = observasion;
    }

    const respuesta = await solicitud(
        `${rutas.ESTADO_PLANIFICACION}/${revisionPlanifID}`,
        "PUT",
        datos
    );
    return respuesta;
};

export const registrarPlanificacionEmpresa = async (datos={}) => {
    const respuesta = await solicitud(`${rutas.REGISTRAR_PLANIFICACION_EMPRESA}`,"POST", datos);
    return respuesta;
}

export const borrarPlanificacionEmpresa = async ( planificacionID ) => {
    const respuesta = await solicitud(`${rutas.ELEMENTO_PLANIFICACION_PROYECTO_EMPRESA}/${planificacionID}`, "DELETE");
    return respuesta;
}

export const obtenerPlanillasDocenteSeguimiento = async (docenteID = 1) => {
    const respuesta = await solicitud(`${rutas.PLANILLAS_DOCENTE_SEGUIMIENTO}/${docenteID}`);
    return respuesta;
}

export const agregarItemPlanillaSeguimiento = async (datos={}) => {
    const respuesta = await solicitud(`${rutas.ITEM_PLANILLA_SEGUIMIENTO}`, "POST", datos);
    return respuesta;
}

export const agregarItemPlanillaEvaluacion = async (datos={}) => {
    const respuesta = await solicitud(`${rutas.ITEM_PLANILLA_EVALUACION}`, "POST", datos);
    return respuesta;
}

export const actualizarItemPlanillaSeguimiento = async (itemID=1, datos={}) => {
    const respuesta = await solicitud(`${rutas.ITEM_PLANILLA_SEGUIMIENTO}/${itemID}`, "PUT", datos);
    return respuesta;
}

export const actualizarPlanillaSeguimiento = async (planillaID=1, datos={}) => {
    const respuesta = await solicitud(`${rutas.PLANILLA_SEGUIMIENTO}/${planillaID}`, "PUT", datos);
    return respuesta;
}

export const actualizarPlanillaEvaluacion = async (planillaID=1, datos={}) => {
    const respuesta = await solicitud(`${rutas.PLANILLA_EVALUACION}/${planillaID}`, "PUT", datos);
    return respuesta;
}

export const actualizarItemPlanillaEvaluacion = async (itemID=1, datos={}) => {
    const respuesta = await solicitud(`${rutas.ITEM_PLANILLA_EVALUACION}/${itemID}`, "PUT", datos);
    return respuesta;
}


export const obtenerAsistenciaPlanillaSeguimiento = async (planilla=1) =>{
    const respuesta = await solicitud(`${rutas.ASISTENCIA_PLANILLA_SEGUIMIENTO}/${planilla}`);
    return respuesta;
}

export const obtenerAsistenciaPlanillaEvaluacion = async (planilla=1) =>{
    const respuesta = await solicitud(`${rutas.ASISTENCIA_PLANILLA_EVALUACION}/${planilla}`);
    return respuesta;
}

export const actualizarAsistenciaSeguimiento = async(asistenciaID=1, datos={}) => {
    const respuesta = await solicitud(`${rutas.ASISTENCIA_SEGUIMIENTO}/${asistenciaID}`,"PUT", datos);
    return respuesta;
}
export const actualizarAsistenciaEvaluacion = async(asistenciaID=1, datos={}) => {
    const respuesta = await solicitud(`${rutas.ASISTENCIA_EVALUACION}/${asistenciaID}`,"PUT", datos);
    return respuesta;
}

export const obtenerPlanillasDocenteEvaluacion = async (docenteID = 1) => {
    const respuesta = await solicitud(`${rutas.PLANILLAS_DOCENTE_EVALUACION}/${docenteID}`);
    return respuesta;
}

export const registrarDocente = async (datosFormulario={}) => {
    const respuesta = await solicitud(rutas.REGISTRO_DOCENTE, "POST", datosFormulario);
    return respuesta;
}/* AQUI IGUAL HACER. PREGUNTAR ALK SAMUEL  */
export default solicitud