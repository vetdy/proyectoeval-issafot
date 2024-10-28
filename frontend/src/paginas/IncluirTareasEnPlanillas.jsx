import React, { useState } from 'react';
import '../estilos/AgregarTareas.css';

function AgregarTareas() {
    const [tareas, setTareas] = useState([{ id: 1, nombre: '', descripcion: '' }]);
    const [empresa, setEmpresa] = useState('');
    const [mensajeConfirmacion, setMensajeConfirmacion] = useState('');

    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const newTareas = [...tareas];
        newTareas[index][name] = value;
        setTareas(newTareas);
    };

    const agregarTarea = () => {
        const nuevaTarea = { id: tareas.length + 1, nombre: '', descripcion: '' };
        setTareas([...tareas, nuevaTarea]);
    };

    const eliminarTarea = (index) => {
        const nuevasTareas = tareas.filter((_, i) => i !== index);
        setTareas(nuevasTareas);
    };

    const agregarTareas = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/tareas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    empresa,
                    tareas,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setMensajeConfirmacion(data.mensaje);
            } else {
                setMensajeConfirmacion('Ocurrió un error al intentar guardar las tareas');
                console.error('Error al guardar las tareas:', response.statusText);
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            setMensajeConfirmacion('Ocurrió un error al intentar guardar las tareas');
        }
    };

    return (
        <div className="container-agregar-tareas">
            <div className="row mb-2"> </div>
            
            <div className="col-md-8 banda-titulos "> 
                <h2 className="text-center text-white"> AÑADIR TAREAS </h2>
            </div>
            
            <div className="d-flex align-items-center mb-3">
                <label htmlFor="empresa" className="me-2">Empresa:</label>
                <select
                    id="empresa"
                    className="form-select"
                    value={empresa}
                    onChange={(e) => setEmpresa(e.target.value)}
                >
                    <option value="">Seleccione una empresa</option>
                    <option value="Empresa 1">Empresa 1</option>
                    <option value="Empresa 2">Empresa 2</option>
                    <option value="Empresa 3">Issa soft</option>
                </select>
            </div>

            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <table className="table text-center">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tareas.map((tarea, index) => (
                                    <tr key={tarea.id}>
                                        <td>{tarea.id}</td>
                                        <td>
                                            <input
                                                type="text"
                                                name="nombre"
                                                className="form-control"
                                                value={tarea.nombre}
                                                onChange={(e) => handleInputChange(index, e)}
                                                placeholder="Nombre de la tarea"
                                            />
                                        </td>
                                        <td>
                                            <button className="btn-delete" onClick={() => eliminarTarea(index)}>
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="d-flex justify-content-start mb-3">
                <button className="btn-add-task me-2" onClick={agregarTarea}>
                    Añadir Tarea
                </button>
                <button className="btn-save" onClick={agregarTareas}>
                    Guardar
                </button>
            </div>

            {mensajeConfirmacion && (
                <div className="alert alert-info mt-3">
                    {mensajeConfirmacion}
                </div>
            )}
        </div>
    );
}

export default AgregarTareas;
