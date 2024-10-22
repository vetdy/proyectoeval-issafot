import color from "../estilos/color";
import { Tabla } from "../componentes/tablas";

const Planilla = ({
    empresa = "ISSA Soft",
    empresaID = 1,
    tipoPlanilla = "evaluacion",
    fecha = "20-10-24",
}) => {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12 text-center">
                    <h2 className="fw-bold">{`${tipoPlanilla === "evaluacion" ? "Evaluación" : "Seguimiento Semanal"}`}</h2>
                    <h3 className="fw-bold">Empresa: <span className="fw-normal">{empresa}</span></h3>
                </div>
            </div>
            
            <div className="row mt-2">
                <div className="col-md-6 d-flex flex-column">
                    <h3>Datos de la Planificación</h3>
                    <h4 className="fw-bold">Titulo: <span className="fw-normal">Sprint 2</span></h4>
                    <h5 className="fw-bold">Fecha:  <span className="fw-normal">{fecha}</span></h5>
                    <h5 className="fw-bold">Hora:   <span className="fw-normal">{"08:15"}</span></h5>
                </div>
            </div>

            <div className="row mt-2">
                <div className="col-md-6">
                    <h3>Control de Asistencia</h3>
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col border-bottom border-eva-dark">
                                <div className="d-flex justify-content-between">
                                    <h6>Integrante</h6>
                                    <h6>Presente</h6>
                                </div>
                            </div>
                        </div>
                        <div className="row align-items-center">
                            <div className="col border-bottom border-eva-info">
                                <div className="d-flex justify-content-between">
                                    Ariel Valencia
                                    <input type="checkbox" name="" id="" />
                                </div>
                            </div>
                        </div>
                        <div className="row align-items-center">
                            <div className="col border-bottom border-eva-info">
                                <div className="d-flex justify-content-between">
                                    Ever Coca
                                    <input type="checkbox" name="" id="" />
                                </div>
                            </div>
                        </div>
                        <div className="row align-items-center">
                            <div className="col border-bottom border-eva-info">
                                <div className="d-flex justify-content-between">
                                    Erlinda
                                    <input type="checkbox" name="" id="" />
                                </div>
                            </div>
                        </div>
                        <div className="row align-items-center">
                            <div className="col border-bottom border-eva-info">
                                <div className="d-flex justify-content-between">
                                    Jose
                                    <input type="checkbox" name="" id="" />
                                </div>
                            </div>
                        </div>
                        <div className="row align-items-center">
                            <div className="col border-bottom border-eva-info">
                                <div className="d-flex justify-content-between">
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

            <div className="row my-2">
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
};

const VistaGenegal = () => {
    return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">
                    <h3 className="text-center">Planillas de Seguimiento y Evaluación</h3>
                </div>
            </div>

            <div className="row">
                <h4 className="fw-bold">Semana: <span className="fw-normal">21-10-24 - 25-10-24</span></h4>
                <p><span className="bg-eva-success px-2 rounded-5"></span>&nbsp;Seguimiento</p>
                <p><span className="bg-eva-danger px-2 rounded-5"></span>&nbsp;Evaluación</p>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <Tabla px0={true} hover={false} datos={["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"]}>
                        <tr>
                            <td></td>
                            <td></td>
                            <td > 
                                <div className="d-flex gap-2">
                                    <button className="btn ">
                                        <span className="bg-eva-success px-2 rounded-5"></span>
                                        <span>&nbsp;ISSA Soft</span>
                                    </button>
                                </div>
                                <div className="d-flex gap-2">
                                    <button className="btn ">
                                        <span className="bg-eva-danger px-2 rounded-5"></span>
                                        <span>&nbsp;ISSA Soft</span>
                                    </button>
                                </div>
                            </td>
                            <td></td>
                            <td></td>
                        </tr>
                    </Tabla>
                </div>
            </div>
        </div>
    );
}

const PlanillasDocente = () => {
    return (
        <VistaGenegal />
    );
};

export default PlanillasDocente;
