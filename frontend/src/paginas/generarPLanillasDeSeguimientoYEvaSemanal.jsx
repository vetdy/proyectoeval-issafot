import { useState } from 'react';

function GenerarPlanillas() {
    const [empresas, setEmpresas] = useState([
        { nombre: "Issa Soft", estado: "Aceptado" },
        { nombre: "TechSoft", estado: "En revision" },
        { nombre: "SoftJav", estado: "Rechazado" },
        { nombre: "Emp XX", estado: "No existee" },
    ]);

    // Función para generar planilla individual
    const generarPlanilla = (empresa) => {
        if (empresa.estado === "Aceptado") {
            alert(`Generando planilla para: ${empresa.nombre}`);
        } else {
            alert(`No se puede generar planilla para: ${empresa.nombre} debido a su estado (${empresa.estado})`);
        }
    };

    // Función para generar planillas para todas las empresas aceptadas
    const generarTodas = () => {
        const aceptadas = empresas.filter((empresa) => empresa.estado === "Aceptado");
        if (aceptadas.length > 0) {
            alert(`Generando planillas para: ${aceptadas.map(e => e.nombre).join(', ')}`);
        } else {
            alert("No hay empresas aceptadas para generar planillas.");
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Generar Planillas de Seguimiento y Evaluación Semanal</h2>
            <table className="table table-striped ">
                <thead className="table table-sm my-0 table-hover">
                    <tr>
                        
                        <th scope="col" class="bg-eva-secondary text-eva-light">Empresa</th>
                        <th scope="col" class="bg-eva-secondary text-eva-light">Estado</th>
                        <th scope="col" class="bg-eva-secondary text-eva-light">Generar</th>
                    </tr>
                </thead>
                <tbody>
                    {empresas.map((empresa, index) => (
                        <tr key={index}>
                            <td>{empresa.nombre}</td>
                            <td>{empresa.estado}</td>
                            <td>
                                <button
                                    className="btn btn-eva-info"
                                    onClick={() => generarPlanilla(empresa)}
                                    disabled={empresa.estado !== "Aceptado"}
                                >
                                    Generar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="text-center">
                <button className="btn btn-eva-secondary col-sm-3" onClick={generarTodas}>
                    Generar todas
                </button>
            </div>
        </div>
    );
}

export default GenerarPlanillas;
