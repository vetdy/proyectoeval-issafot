import { useState } from "react"

const Planilla = () => {
    return(
        <div className="container-fluid ">
            <table className="table table-hover">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Entregable</th>
                        <th scope="col">Fecha Inicio</th>
                        <th scope="col">Fecha Fin</th>
                        <th scope="col">Detalle</th>
                    </tr>
                </thead>
                <tbody >
                    <tr>
                        <th scope="row">1</th>
                        <td>Sprint 0</td>
                        <td>20-08-24</td>
                        <td>01-09-24</td>
                        <td>+</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Planilla;