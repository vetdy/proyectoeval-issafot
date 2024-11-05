import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Tabla } from "../componentes/tablas";
import { IconoCargando, IconoCirculo } from "../componentes/iconos";
import {
    obtenerPlanillasDocenteSeguimiento,
    obtenerPlanillasDocenteEvaluacion,
} from "../servicios/api";
import { obtenerSemanaActual, obtenerDia, obtenerFechaCadena } from "../utils/tiempo";
import color from "../estilos/color";

const fechaDentroRango = (fecha, ini, fin) => {
    if( fecha >= ini && fecha <= fin ){
        return true;
    }
    return false;
}

const filtrarDatos = (datos=[], semana) => {
    const nuevosDatos = {
        "1": [],        //lunes
        "2": [],        //martes
        "3": [],        //miercoles
        "4": [],        //jueves
        "5": [],        //viernes
    };

    for( const d of datos ){
        if( fechaDentroRango(new Date(d.fecha_revision), semana.primerDia, semana.ultimoDia) ){
            const dia = obtenerDia(d.fecha_revision);
            
            if( nuevosDatos[dia] ){
                nuevosDatos[dia].push(d);
            }
        }
    }

    return nuevosDatos;
}

const itemPlanilla = (dato, tipo="seguimiento") => {
    const nombre = dato.nombre_empresa;
    const revisado = dato.concluido;
    const titulo = dato.titulo;
    const fecha = dato.fecha_revision.split("-").reverse().join("-");
    const hora = dato.hora_revision.slice(0,5);
    const idSeguimiento = dato.id;
    const icono = {
        seguimiento: color.fondo.exito,
        evaluacion: color.fondo.peligro,
        terminado: color.fondo.primario
    }

    return(
        <div className="d-flex gap-2" key={`data-${nombre}`}>
            <Link
                className="btn d-flex align-items-center"
                to={"/planillas/revision"}
                state={{nombre, tipo, titulo, fecha, hora, idSeguimiento}}
            >
                <IconoCirculo
                    color={revisado ? icono.terminado : icono[tipo]}
                />
                <span className="m-0">
                    &nbsp;{nombre}
                </span>
            </Link>
        </div>
    );
}

const VistaGenegal = ({ seguimiento=[], evaluacion=[] }) => {
    const semana = obtenerSemanaActual();
    const datosSeguimiento = filtrarDatos(seguimiento,semana);
    const datosEvaluacion = filtrarDatos(evaluacion,semana);

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">
                    <h3 className="text-center">
                        Planillas de Seguimiento y Evaluación
                    </h3>
                </div>
            </div>

            <div className="row pb-2">
                <h4 className="fw-bold">
                    Semana:{" "}
                    <span className="fw-normal">
                        {obtenerFechaCadena(semana.primerDia)}
                        {" "}a{" "}
                        {obtenerFechaCadena(semana.ultimoDia)}
                    </span>
                </h4>
                <div className="col d-flex align-items-center">
                    <IconoCirculo color={color.fondo.exito} />
                    <p className="m-0">&nbsp;Seguimiento</p>
                </div>
                <div className="col d-flex align-items-center">
                    <IconoCirculo color={color.fondo.peligro} />
                    <p className="m-0">&nbsp;Evaluación</p>
                </div>
                <div className="col d-flex align-items-center">
                    <IconoCirculo color={color.fondo.primario} />
                    <p className="m-0">&nbsp;Revisado</p>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <Tabla
                        px0={true}
                        hover={false}
                        datos={[
                            "Lunes",
                            "Martes",
                            "Miércoles",
                            "Jueves",
                            "Viernes",
                        ]}
                    >
                        <tr>
                            <td>
                                {datosSeguimiento[1].map(d => {
                                    return itemPlanilla(d, "seguimiento");
                                })}
                                {datosEvaluacion[1].map(d => {
                                    return itemPlanilla(d,"evaluacion");
                                })}
                            </td>
                            <td>
                                {datosSeguimiento[2].map(d => {
                                    return itemPlanilla(d, "seguimiento");
                                })}
                                {datosEvaluacion[2].map(d => {
                                    return itemPlanilla(d,"evaluacion");
                                })}
                            </td>
                            <td>
                                {datosSeguimiento[3].map(d => {
                                    return itemPlanilla(d, "seguimiento");
                                })}
                                {datosEvaluacion[3].map(d => {
                                    return itemPlanilla(d,"evaluacion");
                                })}
                            </td>
                            <td>
                                {datosSeguimiento[4].map(d => {
                                    return itemPlanilla(d, "seguimiento");
                                })}
                                {datosEvaluacion[4].map(d => {
                                    return itemPlanilla(d,"evaluacion");
                                })}
                            </td>
                            <td>
                                {datosSeguimiento[5].map(d => {
                                    return itemPlanilla(d, "seguimiento");
                                })}
                                {datosEvaluacion[5].map(d => {
                                    return itemPlanilla(d,"evaluacion");
                                })}
                            </td>
                        </tr>
                    </Tabla>
                </div>
            </div>
        </div>
    );
};

const PlanillasDocente = () => {
    const [seguimiento, setSeguimiento] = useState([]);
    const [evaluacion, setEvaluacion] = useState([]);

    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(false);
    const consulta = useRef(false);

    useEffect(()=>{
        const cargarDatos = async () => {
            const res1 = await obtenerPlanillasDocenteSeguimiento(1);
            if(res1.status === 200){
                setSeguimiento(res1.message.planillas_seguimientos);
                console.log(res1);
            }
            else{
                setError(true);
            }

            if( !error ){
                const res2 = await obtenerPlanillasDocenteEvaluacion(1);
                if(res2.status === 200){
                    setEvaluacion(res2.message.evaluacions);
                }
                else{
                    setError(true);
                }
            }

            setCargando(false);
        }
        if( !consulta.current ){
            consulta.current = true;
            cargarDatos();
        }
    },[]);

    if (cargando) {
        return (
            <div className="d-flex justify-content-center align-items-center w-100 pt-5">
                <IconoCargando />
            </div>
        );
    }

    if ( error ){
        return (
            <div>
                Ocurrio un error...
            </div>
        );
    }

    return <VistaGenegal seguimiento={seguimiento} evaluacion={evaluacion}/>;
};

export default PlanillasDocente;
