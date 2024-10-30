import { useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Tabla } from "../componentes/tablas";
import {
    obtenerItemsPlanillaSeguimiento,
    obtenerAsistenciaPlanillaSeguimiento,
    obtenerItemsPlanillaEvaluacion,

} from "../servicios/api";
import { IconoCargando } from "../componentes/iconos";
import { useNavigate } from "react-router-dom";
import logo from "/logo.png"

const Planilla = ({datos, planilla, asistencia}) => {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12 d-flex flex-column justify-content-center align-items-center">
                    <h2 className="fw-bold">{`${datos.tipo === "evaluacion" ? "Evaluación" : "Seguimiento Semanal"}`}</h2>
                    <div className="d-flex justify-content-center align-items-center">
                        <h3 className="fw-bold m-0">
                            Empresa: <span className="fw-normal">{datos.nombre}</span>
                        </h3>
                        {/* <img style={{width:"40px",height:"100%", margin:"auto",padding:"4px"}} src={logo} alt="logo Empresa" /> */}
                    </div>
                </div>
            </div>

            <div className="row mt-2">
                <div className="col-sm-6 ">
                    <div className="container">
                        <div className="row">
                            <h3>Datos de la Planificación</h3>
                        </div>
                        <div className="row">
                            <div className="col">
                                <h4 className="fw-bold">Titulo: <span className="fw-normal">{datos.titulo}</span></h4>
                                <h5 className="fw-bold">Fecha:  <span className="fw-normal">{datos.fecha}</span></h5>
                                <h5 className="fw-bold">Hora:   <span className="fw-normal">{datos.hora}</span></h5>
                            </div>  
                    </div>
                </div>
                </div>
                <div className="col-sm-6">
                    <div className="container">
                        <h3>Control de Asistencia</h3>
                    </div>
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col border-bottom border-eva-dark">
                                <div className="d-flex justify-content-between">
                                    <h6>Integrante</h6>
                                    <h6>Presente</h6>
                                </div>
                            </div>
                        </div>
                        {asistencia.map( a => {
                            return(
                                <div className="col border-bottom border-eva-info"
                                    key={`list-${a.id_usuario}`}
                                >
                                    <div className="d-flex justify-content-between align-items-center text-capitalize">
                                        {a.nombre_usuario}
                                        <input type="checkbox" name="" id="" />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                
            </div>

            <br />
            <div className="row">
                <h3>Planilla</h3>
            </div>
            <div className="row px-2">
                <Tabla datos={["#", "Tarea", "Observación"]}>
                    {planilla.map((p, index) => {
                        return(
                            <tr key={`planilla-item-${index}`}>
                                <td>{index + 1}</td>
                                <td>{p.titulo}</td>
                                <td>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name=""
                                        id=""
                                    />
                                </td>
                            </tr>
                        );
                    })}
                </Tabla>
            </div>

            <div className="row my-2 g-0">
                <div className="col">
                    <div className="row g-1">
                        <div className="col-md-2">
                            <button className="btn btn-eva-info w-100">
                                Agregar Tarea
                            </button>
                        </div>
                        <div className="col-md-2">
                            <button className="btn btn-eva-info w-100">
                                Eliminar Tarea
                            </button>
                        </div>
                        <div className="col-md-6"></div>
                        <div className="col-md-2">
                            <button className="btn btn-eva-secondary w-100">
                                Terminar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const RevisionPlanilla = () => {
    const location = useLocation();
    const history = useNavigate();
    const datos = location.state;
    
    const [planilla, setPlanilla] = useState([]);
    const [asistencia, setAsistencia] = useState([]);
    const [error, setError] = useState(false);
    const [cargando, setCargando] = useState(true);
    const consulta = useRef(true);
    
    useEffect(() =>{
        const irAPlanillas = () => { history("/planillas") };

        //console.log(datos);
        const solicitud = async () => {
            let res1;

            if( datos.tipo === "seguimiento" ){
                res1 = await obtenerItemsPlanillaSeguimiento(datos.idSeguimiento);
            }
            else{
                //respuesta = await obtenerItemsPlanillaEvaluacion(datos.idSeguimiento);
                res1 = {status:200, message:{item_planilla:[{}]}};
            }

            if( res1.status === 200 ){
                setPlanilla(res1.message.item_planilla);
            }
            else{
                setError(true);
            }

            if( !error ){
                let res2;
                if( datos.tipo === "seguimiento" ){
                    res2 = await obtenerAsistenciaPlanillaSeguimiento(datos.idSeguimiento);
                    
                    if( res2.status === 200 ){
                        setAsistencia(res2.message.usuarios);
                        //console.log(res2);
                    }
                }
            }

            setCargando(false);
        }

        if ( datos && consulta.current){
            solicitud();
            consulta.current = false;
        }

        if ( !datos ){
            irAPlanillas();
        }

    },[]);

    if ( cargando ){
        return(
            <div className="container-fluid">
                <div className="row">
                    <IconoCargando />
                </div>
            </div>
        );
    }

    if( error ){
        return(
            <div>Ocurrio un error...</div>
        );
    }

    return <Planilla datos={datos} planilla={planilla} asistencia={asistencia}/>
};

export default RevisionPlanilla