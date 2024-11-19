import { useEffect, useState, useRef } from "react";
import { Tabla } from "../componentes/tablas";
import { Link } from "react-router-dom";
import { IconoCargando } from "../componentes/iconos";
import { Error } from "../componentes/general";
import { obtenerProyectosEmpresaDocente, obtenerProyectosEmpresa } from "../servicios/api";

const SelectorProyecto = ({opciones, selector}) => {
    return(
        <div className="container-fluid bg-white">
            <div className="row align-items-center">
                <div className="col-sm-2 col-lg-1 p-1">
                    <h6 className="m-0">Proyecto</h6>
                </div>
                <div className="col-sm-8 col-lg-10 p-1">
                    <select name="" id="" className="form-select">
                        <option value="">Seguimiento y gention de proyectos</option>
                    </select>
                </div>
                <div className="col-sm-2 col-lg-1 p-1">
                    <button className="btn btn-eva-secondary w-100">Revisar</button>
                </div>
            </div>
        </div>
    );
}

const RevisionPlanificacionesDocente = () => {
    const [proyectosEmpresas, setProyectosEmpresas] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(false);
    const consulta = useRef(true);

    useEffect(()=>{
        const obtenerProyectos = async () =>{
            const consultaEmpresas = await obtenerProyectosEmpresaDocente(1);
            if( consultaEmpresas.status === 200){
                const nuevoProyectosEmpresas = consultaEmpresas.message.proyecto_por_docente;
                setProyectosEmpresas(nuevoProyectosEmpresas);
            }
            else{
                setError(true);
            }
            setCargando(false);
        }
        if(consulta.current){
            consulta.current = false;
            obtenerProyectos();
        }
    },[]);

    if (cargando) {
        return (
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <IconoCargando />
                </div>
            </div>
        );
    }

    if( error ){
        return <Error />
    }

    return(
        <div className="container-fluid">
            <div className="row">
                <div className="col">
                    <h2 className="text-center">Revisión de Planificación de Empresas</h2>
                </div>
            </div>
            {/* <div className="row mb-2">
                <div className="col">
                    <SelectorProyecto />
                </div>
            </div> */}
            <Tabla datos={["Empresa", "Proyecto", "Estado", "Revisión"]} hover={false} px0={true}>
                {proyectosEmpresas.map( (p, idx) => {
                    return(
                        <tr key={`proy-emp${idx}`}>
                            <td>
                                {p.nombre_empresa}
                            </td>
                            <td>
                                Proyecto de Creacion de Aulas
                            </td>
                            <td className="text-capitalize">
                                {p.estado}
                            </td>
                            <td>
                                {p.estado === "no existe" && "No disponible"}
                                {p.estado !== "no existe" && (
                                    <Link className="btn btn-eva-secondary"
                                        to={"/evaluaciones/planes-empresa/revision"}
                                        state={p}
                                    >
                                        Ver
                                    </Link>
                                )}
                            </td>
                        </tr>
                    );
                })}
            </Tabla>
        </div>
    );
}

export default RevisionPlanificacionesDocente