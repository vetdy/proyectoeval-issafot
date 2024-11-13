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

export const obtenerPlanillasEmpresa = async (empresa=1) => {
    const respuesta = await solicitud(`${rutas.PLANTILLA_EMPRESA}/${empresa}`);
    return respuesta;
}

export const obtenerPlanificacionEmpresa = async (empresaID=1) => {
    const respuesta = await solicitud(`${rutas.PLANIFICACION_PROYECTO_EMPRESA}/${empresaID}`);
    return respuesta;
}

export const registrarPlanificacionEmpresa = async (datos={}) => {
    const respuesta = await solicitud(`${rutas.REGISTRAR_PLANIFICACION_EMPRESA}`,"POST", datos);
    return respuesta;
}

export const obtenerPlanillasDocenteSeguimiento = async (docenteID = 1) => {
    const respuesta = await solicitud(`${rutas.PLANILLAS_DOCENTE_SEGUIMIENTO}/${docenteID}`);
    return respuesta;
}

export const obtenerItemsPlanillaSeguimiento = async (planilla=1) => {
    const respuesta = await solicitud(`${rutas.ITEMS_PLANTILLA_SEGUIMIENTO}/${planilla}`);
    return respuesta;
}

export const actualizarItemPlanillaSeguimiento = async (itemID=1, datos={}) => {
    const respuesta = await solicitud(`${rutas.ITEM_PLANILLA_SEGUIMIENTO}/${itemID}`, "PUT", datos);
    return respuesta;
}

export const obtenerAsistenciaPlanillaSeguimiento = async (planilla=1) =>{
    const respuesta = await solicitud(`${rutas.ASISTENCIA_PLANILLA_SEGUIMIENTO}/${planilla}`);
    return respuesta;
}

export const obtenerPlanillasDocenteEvaluacion = async (docenteID = 1) => {
    const respuesta = await solicitud(`${rutas.PLANILLAS_DOCENTE_EVALUACION}/${docenteID}`);
    return respuesta;
}

export const obtenerItemsPlanillaEvaluacion = async (planilla=1) => {
    const respuesta = await solicitud(`${rutas.ITEMS_PLANTILLA_EVALUACION}/${planilla}`);
    return respuesta;
}

export const registrarDocente = async (datosFormulario={}) => {
    const respuesta = await solicitud(rutas.REGISTRO_DOCENTE, "POST", datosFormulario);
    return respuesta;
}/* AQUI IGUAL HACER. PREGUNTAR ALK SAMUEL  */
export default solicitud