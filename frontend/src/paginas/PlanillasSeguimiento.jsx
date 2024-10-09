import { useState } from "react";
import { Tabla } from "../componentes/tablas";

const PlanillasSeguimiento = () => {
    const datosPrueba = [
        {
            "ID": "Sprint 0",
            "Fecha revision": "20-08-24",
            "Hora revision": "8:00 AM",
            "Detalle": "<boton>Detalle",
        },
        {
            "ID": "Sprint 1",
            "Fecha revision": "27-08-24",
            "Hora revision": "8:00 AM",
            "Detalle": "<boton>Detalle",
        },
        {
            "ID": "Sprint 2",
            "Fecha revision": "27-08-24",
            "Hora revision": "8:00 AM",
            "Detalle": "<boton>Detalle",
        },
    ];
    const datosP = ["ID", "Fecha", "Hora", "Detalle"]

    const [datos, setDatos] = useState(datosPrueba);

    return(
        <div>
            <div className="mx-4 mt-2">
                <div className="d-flex justify-content-between">
                    <div>
                        <h3>NOMBRE EMPRESA: <span className="fw-bold">ISSA SOFT</span></h3>
                    </div>
                    <div>
                        <h3>Docente: <span className="fw-bold">Consultor TIS</span></h3>
                    </div>
                </div>
            </div>
            <br></br>
            <Tabla datos={datos}></Tabla>
        </div>
    );
}

export default PlanillasSeguimiento