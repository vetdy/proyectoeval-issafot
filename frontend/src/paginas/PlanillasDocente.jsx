import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Tabla } from "../componentes/tablas";
import { IconoCargando, IconoCirculo } from "../componentes/iconos";
import { obtenerPlanillasDocenteSeguimiento } from "../servicios/api";
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

const VistaGenegal = ({ datos=[] }) => {
    const semana = obtenerSemanaActual();
    const datosDia = filtrarDatos(datos,semana);
    //console.log(datos);
    //console.log(datosDia);

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
                            "Miercoles",
                            "Jueves",
                            "Viernes",
                        ]}
                    >
                        <tr>
                            <td>
                                {datosDia[1].map(d => {
                                    return(
                                        <div className="d-flex gap-2">
                                            <Link
                                                className="btn d-flex align-items-center"
                                                to={"/planillas/revision"}
                                            >
                                                <IconoCirculo
                                                    color={color.fondo.exito}
                                                />
                                                <span className="m-0">
                                                    &nbsp;ISSA Soft
                                                </span>
                                            </Link>
                                        </div>
                                    );
                                })}
                            </td>
                            <td>
                                {datosDia[2].map(d => {
                                    return(
                                        <div className="d-flex gap-2">
                                            <Link
                                                className="btn d-flex align-items-center"
                                                to={"/planillas/revision"}
                                            >
                                                <IconoCirculo
                                                    color={color.fondo.exito}
                                                />
                                                <span className="m-0">
                                                    &nbsp;ISSA Soft
                                                </span>
                                            </Link>
                                        </div>
                                    );
                                })}
                            </td>
                            <td>
                                {datosDia[3].map(d => {
                                    return(
                                        <div className="d-flex gap-2">
                                            <Link
                                                className="btn d-flex align-items-center"
                                                to={"/planillas/revision"}
                                            >
                                                <IconoCirculo
                                                    color={color.fondo.exito}
                                                />
                                                <span className="m-0">
                                                    &nbsp;ISSA Soft
                                                </span>
                                            </Link>
                                        </div>
                                    );
                                })}
                                <div className="d-flex gap-2">
                                    <button className="btn d-flex align-items-center">
                                        <IconoCirculo
                                            color={color.fondo.peligro}
                                        />
                                        <span className="m-0">
                                            &nbsp;ISSA Soft
                                        </span>
                                    </button>
                                </div>
                            </td>
                            <td>
                                {datosDia[4].map(d => {
                                    return(
                                        <div className="d-flex gap-2">
                                            <Link
                                                className="btn d-flex align-items-center"
                                                to={"/planillas/revision"}
                                            >
                                                <IconoCirculo
                                                    color={color.fondo.exito}
                                                />
                                                <span className="m-0">
                                                    &nbsp;ISSA Soft
                                                </span>
                                            </Link>
                                        </div>
                                    );
                                })}
                            </td>
                            <td>
                                {datosDia[5].map(d => {
                                    return(
                                        <div className="d-flex gap-2">
                                            <Link
                                                className="btn d-flex align-items-center"
                                                to={"/planillas/revision"}
                                            >
                                                <IconoCirculo
                                                    color={color.fondo.exito}
                                                />
                                                <span className="m-0">
                                                    &nbsp;ISSA Soft
                                                </span>
                                            </Link>
                                        </div>
                                    );
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
    const [datos, setDatos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const consulta = useRef(false);

    useEffect(()=>{
        const cargarDatos = async () => {
            const respuesta = await obtenerPlanillasDocenteSeguimiento(1);
            if(respuesta.status === 200){
                setDatos(respuesta.message.planillas_seguimientos);
                setCargando(false);
            }
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

    return <VistaGenegal datos={datos}/>;
};

export default PlanillasDocente;
