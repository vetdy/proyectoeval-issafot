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

        if(! respuesta.ok && respuesta.status !== 422){
            console.error(`Error en backend: ${respuesta.status}: ${respuesta.statusText}`);
            return {
                status: respuesta.status,
                message: respuesta.statusText,
            };
        }
        
        if(! contenido.hasOwnProperty("contenido") ){
            console.error(`Error en backend: Se devolvio una respuesta sin contenido`);
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

export default solicitud