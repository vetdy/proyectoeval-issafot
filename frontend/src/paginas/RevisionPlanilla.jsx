import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Tabla } from "../componentes/tablas";
import logo from "/logo.png"

const Planilla = ({datos}) => {
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
                        <div className="row">
                            <div className="col border-bottom border-eva-info">
                                <div className="d-flex justify-content-between align-items-center">
                                    Ariel Valencia
                                    <input type="checkbox" name="" id="" />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col border-bottom border-eva-info">
                                <div className="d-flex justify-content-between align-items-center">
                                    Ever Coca
                                    <input type="checkbox" name="" id="" />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col border-bottom border-eva-info">
                                <div className="d-flex justify-content-between align-items-center">
                                    Erlinda
                                    <input type="checkbox" name="" id="" />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col border-bottom border-eva-info">
                                <div className="d-flex justify-content-between align-items-center">
                                    Jose
                                    <input type="checkbox" name="" id="" />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col border-bottom border-eva-info">
                                <div className="d-flex justify-content-between align-items-center">
                                    Samuel
                                    <input type="checkbox" name="" id="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>

            <br />
            <div className="row">
                <h3>Planilla</h3>
            </div>
            <div className="row px-2">
                <Tabla datos={["#", "Tarea", "Observación"]}>
                    <tr>
                        <td>1</td>
                        <td>Registrar Docente</td>
                        <td>
                            <input
                                className="form-control"
                                type="text"
                                name=""
                                id=""
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Registrar Empresa</td>
                        <td>
                            <input
                                className="form-control"
                                type="text"
                                name=""
                                id=""
                            />
                        </td>
                    </tr>
                </Tabla>
            </div>

            <div className="row my-2 g-0">
                <div className="col container">
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
    const datos = location.state;
    
    useEffect(() =>{
        
    },[]);

    if( datos ){
        return <Planilla datos={datos} />
    }
    return <div>Invalido...</div>
};

export default RevisionPlanilla