import { useState } from "react";
import { Tabla } from "../componentes/tablas";

const PlanillasSeguimiento = () => {
    const [datos, setDatos] = useState([
        {
            "id": "",
            "Parametros": "",
            "Responsable": "",
            "Valoracion": "",
        },
    ]);

    return(
        <Tabla datos={datos}></Tabla>
    );
}

export default PlanillasSeguimiento