import { useState } from "react";
import BotonControl from "./BotonControl";

const leerTitulos = (datos = []) => {
    if (!datos.length) {
        return [];
    }
    if (typeof datos[0] === "string") {
        return datos;
    }
    return Object.keys(datos[0]);
};

const Elemento = ({ texto = "", lista = [], index = 0, regex, pkey = "" }) => {
    const uniqueKey = `${pkey}-elem-${index}`;

    if (!texto) {
        return;
    }
    if (!regex.test(texto)) {
        if (index > 0 && lista[index - 1] === "<boton>") {
            return;
        }
        return <>{texto}</>;
    }
    if (texto !== "<boton>") {
        return <BotonControl tipo={texto} key={uniqueKey}></BotonControl>;
    }
    return <BotonControl key={uniqueKey}>{lista[index + 1]}</BotonControl>;
};

/**
 * Genera una tabla con los datos otorgados a la funcion.
 * Las llaves son los titulos y los valores el contenido.
 * @param {Array<Object>} datos
 * @returns El componente Tabla con los datos
 */
const Tabla = ({ datos = [], children, pagina = 1, porPagina = 10 }) => {
    const titulos = leerTitulos(datos);

    const botones = /(<boton>|<agregar>|<editar>|<eliminar>)/;

    return (
        <div className="container-fluid ">
            <table className="table table-hover">
                <thead>
                    <tr>
                        {titulos.map((t) => {
                            return (
                                <th
                                    scope="col"
                                    key={t}
                                    className="bg-eva-secondary text-eva-light"
                                >
                                    {t}
                                </th>
                            );
                        })}
                    </tr>
                </thead>
                <tbody>
                    {datos.length &&
                        typeof datos[0] !== "string" &&
                        datos.map((json, idx) => {
                            return (
                                <tr key={`dataRow${idx}`}>
                                    {Object.values(json).map((cadena, pos) => {
                                        if (!botones.test(cadena)) {
                                            return (
                                                <td key={`row${idx}Col${pos}`}>
                                                    {cadena}
                                                </td>
                                            );
                                        }
                                        const conBotones =
                                            cadena.split(botones);
                                        return (
                                            <td key={`row${idx}Col${pos}`}>
                                                {conBotones.map((texto, k) => {
                                                    return (
                                                        <Elemento
                                                            key={`row${idx}Col${pos}-elem-${k}`}
                                                            texto={texto}
                                                            lista={conBotones}
                                                            regex={botones}
                                                            index={k}
                                                            pkey={`row${idx}Col${pos}`}
                                                        ></Elemento>
                                                    );
                                                })}
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    {children}
                </tbody>
            </table>
        </div>
    );
};

export default Tabla;
