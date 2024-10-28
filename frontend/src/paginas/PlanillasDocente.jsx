import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Tabla } from "../componentes/tablas";
import { IconoCargando, IconoCirculo } from "../componentes/iconos";
import color from "../estilos/color";

const VistaGenegal = ({ datos }) => {
    const paso = { a: 2, b: 3 };

    console.log(paso);

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
                    <span className="fw-normal">21-10-24 - 25-10-24</span>
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
                            <td></td>
                            <td></td>
                            <td>
                                <div className="d-flex gap-2">
                                    <Link
                                        className="btn d-flex align-items-center"
                                        to={"/planillas/revision"}
                                        state={paso}
                                    >
                                        <IconoCirculo
                                            color={color.fondo.exito}
                                        />
                                        <span className="m-0">
                                            &nbsp;ISSA Soft
                                        </span>
                                    </Link>
                                </div>
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
                            <td></td>
                            <td></td>
                        </tr>
                    </Tabla>
                </div>
            </div>
        </div>
    );
};

const PlanillasDocente = () => {
    const [datos, setDatos] = useState({});
    const [cargando, setCargando] = useState(false);

    /* useEffect(() => {

    }, []); */

    if (cargando) {
        return (
            <div className="d-flex justify-content-center align-items-center w-100 pt-5">
                <IconoCargando />
            </div>
        );
    }

    return <VistaGenegal />;
};

export default PlanillasDocente;
