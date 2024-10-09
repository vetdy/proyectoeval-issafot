import { useState } from "react"

/**
 * Genera una tabla con los datos otorgados a la funcion.
 * Las llaves son los titulos y los valores el contenido.
 * @param {Array<Object>} datos 
 * @returns El componente Tabla con los datos
 */
const Tabla = ({datos=[]}) => {
    const titulos = datos.length ? Object.keys(datos[0]) : [];
    console.log(titulos);
    //console.log(datos[0]);
    //console.log(datos.datos);
    //console.log( Object.keys(datos[0]) );
    //console.log(datos[0]);

    return(
        <div className="container-fluid ">
            <h2>Nombre empresa ISSA SOFT</h2>
            <br></br>
            <table className="table table-hover">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Fecha Revision</th>
                        <th scope="col">Hora Revision</th>
                        <th scope="col">Entregables</th>
                    </tr>
                </thead>
                <tbody >
                    <tr>
                        <td>Sprint 0</td>
                        <td>20-08-24</td>
                        <td>8:00 AM</td>
                        <td><button className="btn btn-eva-secondary">detalle</button></td>
                    </tr>
                    <tr>
                        <td>Sprint 1</td>
                        <td>20-08-24</td>
                        <td>9:00 AM</td>
                        <td><button className="btn btn-eva-secondary">detalle</button></td>
                    </tr>
                    <tr>
                        <td>Sprint 2</td>
                        <td>20-08-24</td>
                        <td>2:00 PM</td>
                        <td><button className="btn btn-eva-secondary">detalle</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Tabla;