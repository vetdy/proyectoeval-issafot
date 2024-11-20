import { useState, useEffect } from "react";

function GenerarPlanillas() {
    const [empresas, setEmpresas] = useState([]);
    const [loading, setLoading] = useState(true);

    // Obtener empresas desde el endpoint específico
   
    useEffect(() => {
        const fetchEmpresas = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/api/empresa/docente/1");
    
                // Verifica si la respuesta es exitosa
                if (!response.ok) {
                    throw new Error(`Error al obtener las empresas: ${response.status}`);
                }
    
                const data = await response.json();
    
                // Actualiza para usar "data.contenido.empresas"
                if (data.contenido && data.contenido.empresas) {
                    setEmpresas(data.contenido.empresas);
                } else {
                    console.error("Datos no encontrados en la respuesta:", data);
                    setEmpresas([]);
                }
            } catch (error) {
                console.error("Error al obtener empresas:", error);
                setEmpresas([]);
            } finally {
                setLoading(false);
            }
        };
    
        fetchEmpresas();
    }, []);
    

    // Función para generar planilla individual
    const generarPlanilla = (empresa) => {
        if (empresa.estado === "Aceptado") {
            alert(`Generando planilla para: ${empresa.nombre_empresa}`);
        } else {
            alert(`No se puede generar planilla para: ${empresa.nombre_empresa} debido a su estado (${empresa.estado})`);
        }
    };

    // Función para generar planillas para todas las empresas aceptadas
    const generarTodas = () => {
        const aceptadas = empresas.filter((empresa) => empresa.estado === "Aceptado");
        if (aceptadas.length > 0) {
            alert(`Generando planillas para: ${aceptadas.map((e) => e.nombre_empresa).join(", ")}`);
        } else {
            alert("No hay empresas aceptadas para generar planillas.");
        }
    };

    // mensaje mientras se cargan los datos
    if (loading) {
        return <p>Cargando datos...</p>;
    }

    // mensaje si no hay empresas disponibles
    if (empresas.length === 0) {
        return <p>No hay empresas disponibles.</p>;
    }

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Generar Planillas de Seguimiento y Evaluación Semanal</h2>
            <table className="table table-striped ">
                <thead className="table table-sm my-0 table-hover">
                    <tr>
                        <th scope="col" class="bg-eva-secondary text-eva-light">Empresa</th>
                        <th scope="col" class="bg-eva-secondary text-eva-light">Nombre Largo</th>
                        <th scope="col" class="bg-eva-secondary text-eva-light">Estado</th>
                        <th scope="col" class="bg-eva-secondary text-eva-light">Generar</th>
                    </tr>
                </thead>
                <tbody>
    {empresas.map((empresa, index) => (
        <tr key={index}>
            <td>{empresa.nombre_corto}</td>
            <td>{empresa.nombre_largo}</td> 
            <td>Activo</td>
            <td>
                <button
                    className="btn fw-bold w-100 btn-eva-secondary"
                    onClick={() => alert(`Generando planilla para: ${empresa.nombre_corto}`)}
                >
                    Generar
                </button>
            </td>
        </tr>
    ))}
</tbody>


            </table>
            <div className="text-center">
                <button className="btn fw-bold   btn-eva-secondary" onClick={generarTodas}>
                    Generar todas
                </button>
            </div>
        </div>
    );
}

export default GenerarPlanillas;
