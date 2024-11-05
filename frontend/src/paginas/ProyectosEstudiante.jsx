import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { IconoCargando } from "../componentes/iconos";


const Encabezado = () =>{
    return (
        <div className={`container-fluid d-none py-2 d-sm-block border-bottom border-eva-info text-light`}
            style={{backgroundColor:"#506278"}}
        >
            <div className="row">
                <div className="col-sm-4 col-md-4 d-flex align-items-center">
                    <h6 className="m-0">Nombre</h6>
                </div>
                <div className="col-sm-4 col-md-4 d-flex align-items-center">
                    <h6 className="m-0">Consultor</h6>
                </div>
                <div className="col-sm-2 col-md-2 d-flex align-items-center">
                    <h6 className="m-0">Estado</h6>
                </div>
                <div className="col-sm-2 col-md-2 d-flex align-items-center">
                    <h6 className="m-0 text-truncate">Planificación</h6>
                </div>
            </div>
        </div>
    );
}

const Fila = ({
    datos = [
        "Sistema de Planificación y Seguimiento",
        "Maria Leticia Blanco Coca",
        "Activo",
    ],
    to = "/mi-proyecto/planificacion",
    state = { id: 1 },
}) => {
    return (
        <div className="container-fluid border-bottom bg-white border-eva-info">
            <div className="row">
                <div className="col-sm-4 col-md-4 d-flex align-items-center">
                    <div className="container">
                        <div className="row">
                            <div className="col d-flex d-sm-none align-items-center">
                                <h6 className="m-0">Nombre</h6>
                            </div>
                            <div className="col py-1">{datos[0]}</div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-4 col-md-4 d-flex align-items-center">
                    <div className="container">
                        <div className="row">
                            <div className="col d-flex d-sm-none align-items-center">
                                <h6 className="m-0">Consultor</h6>
                            </div>
                            <div className="col py-1">{datos[1]}</div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-2 col-md-2 d-flex align-items-center">
                    <div className="container">
                        <div className="row">
                            <div className="col d-flex d-sm-none align-items-center">
                                <h6 className="m-0">Estado</h6>
                            </div>
                            <div className="col py-1">{datos[2]}</div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-2 col-md-2 d-flex align-items-center">
                    <div className="container">
                        <div className="row">
                            <div className="col d-flex d-sm-none align-items-center">
                                <h6 className="m-0">Planificación</h6>
                            </div>
                            <div className="col py-1">
                                <Link
                                    className="btn btn-eva-info"
                                    to={to}
                                    state={state}
                                >
                                    Ir
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


const ProyectosEstudiante = () => {
    const [cargando, setCargando] = useState(false);
    const [datos, setDatos] = useState([]);
    const [error, setError] = useState(false);
    const consulta = useRef(true);

    useEffect(()=>{
        const cargarDatos = async () => {

        }
        if(consulta.current){
            consulta.current=false;
            cargarDatos();
        }
    },[]);

    if( cargando ){
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col d-flex align-items-center justify-content-center">
                        <IconoCargando></IconoCargando>
                    </div>
                </div>
            </div>
        );
    }

    if( error ){
        return <h6>Ocurrio un error...</h6>
    }

    return(
        <div className="container-fluid">
            <div className="row">
                <div className="col">
                    <h2 className="text-center">Mis Proyectos</h2>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <Encabezado/>
                    <Fila></Fila>
                </div>
            </div>
        </div>
    );
}

export default ProyectosEstudiante;