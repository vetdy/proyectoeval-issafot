import { useEffect, useState, useRef } from "react";
import { Tabla } from "../componentes/tablas";
import { Link } from "react-router-dom";

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

const AdminEmpresasDocente = () => {
    const [proyectos, setProyectos] = useState([]);
    const [cosultaProyectos, setConsulaProyectos] = useState(true);
    const [consultaEmpresas, setConsultaEmpresas] = useState(false);
    const [empresas, setEmpresas] = useState([]);
    const consulta = useRef(true);

    useEffect(()=>{
        const obtenerProyectos = async () =>{

        }
        if(consulta.current){
            consulta.current =false;
            obtenerProyectos();
        }
    },[]);

    return(
        <div className="container-fluid">
            <div className="row">
                <div className="col">
                    <h3 className="text-center">Revisar planificación de empresa</h3>
                </div>
            </div>
            <div className="row mb-2">
                <div className="col">
                    <SelectorProyecto />
                </div>
            </div>
            <Tabla datos={["Empresa", "Estado", "Revisión"]} hover={false} px0={true}>
                <tr>
                    <td className="align-middle">ISSA SOFT25</td>
                    <td className="align-middle">No Iniciado</td>
                    <td className="align-middle">
                        <Link className="btn btn-eva-secondary">
                            ver
                        </Link>
                    </td>
                </tr>
            </Tabla>
        </div>
    );
}

export default AdminEmpresasDocente