import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { IconoCargando } from "../componentes/iconos";
import { obtenerProyectosEmpresa } from "../servicios/api";

const filtrarDatos = (datos = [], idEmpr) => {
    const nuevosDatos = datos.map(d => {
        return {
            nombre: d.nombre_proyecto,
            consultor: "Mateo Corina",
            habilitado: d.habilitado,
            link: "/mi-proyecto/planificacion",
            state: {id_empresa: idEmpr},
        }
    });
    console.log(datos);
    return nuevosDatos;
}

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
    datos = {
        nombre: "Sistema de Planificación y Seguimiento",
        consultor: "Maria Leticia Blanco Coca",
        habilitado: true,
        link: "/mi-proyecto/planificacion",
        state: {id_proyecto: 1},
    }
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
                            <div className="col py-1">{datos.nombre}</div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-4 col-md-4 d-flex align-items-center">
                    <div className="container">
                        <div className="row">
                            <div className="col d-flex d-sm-none align-items-center">
                                <h6 className="m-0">Consultor</h6>
                            </div>
                            <div className="col py-1">{datos.consultor}</div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-2 col-md-2 d-flex align-items-center">
                    <div className="container">
                        <div className="row">
                            <div className="col d-flex d-sm-none align-items-center">
                                <h6 className="m-0">Estado</h6>
                            </div>
                            <div className="col py-1">{datos.habilitado ? "Activo" : "Inactivo" }</div>
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
                                    to={datos.link}
                                    state={datos.state}
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
    const [cargando, setCargando] = useState(true);
    const [datos, setDatos] = useState([]);
    const [error, setError] = useState(false);
    const consulta = useRef(true);
    const [idEmpr, setIdEmpr] = useState("1");

    useEffect(()=>{
        const cargarDatos = async () => {
            const nuevosDatos = await obtenerProyectosEmpresa(idEmpr);
            if( nuevosDatos.status !== 404 ){
                const lista = filtrarDatos(nuevosDatos.message.proyecto_por_empresa, idEmpr);
                setDatos(lista);
            }
            setCargando(false);
        }
        if(consulta.current){
            consulta.current=false;
            cargarDatos();
        }
    },[]);

    useEffect(()=>{
        const cargarDatos = async () => {
            const nuevosDatos = await obtenerProyectosEmpresa(idEmpr);
            if( nuevosDatos.status !== 404 ){
                const lista = filtrarDatos(nuevosDatos.message.proyecto_por_empresa, idEmpr);
                setDatos(lista);
            }
            setCargando(false);
        }
        cargarDatos();
    },[idEmpr]);

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
                    {datos.map( (d, idx) =>{
                        return(
                            <Fila key={`proy-${idx}`} datos={d}></Fila>
                        );
                    })}
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <label htmlFor="idemp" className="px-2">
                        Empresa
                    </label>
                    <select
                        name="idemp"
                        id="idemp"
                        value={idEmpr}
                        onChange={(ev) => {
                            setCargando(true);
                            setIdEmpr(ev.target.value);
                        }}
                    >
                        <option value="1">techoSol</option>
                        <option value="2">ISSA Soft</option>
                    </select>
                </div>
            </div>
        </div>
    );
}

export default ProyectosEstudiante;