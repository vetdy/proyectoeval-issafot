import { useState } from 'react';

function App() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [identificador, setIdentificador] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  
  
  const [mensaje, setMensaje] = useState(null);
  const [tipoMensaje, setTipoMensaje] = useState(null);

  const mostrarDatos = () => {
    if (nombre && apellido && identificador && contrasenia) {
      // mostrar si todos xd
      setMensaje("Docente registrado con éxito.");
      setTipoMensaje("success");
    } else {
      // mostrar si no todes xd
      setMensaje("Error: Todos los campos son obligatorios.");
      setTipoMensaje("danger");
    }
  };

  return (
    <div className="App container mt-4">
      <div className="datos form-group">
        <label >Registrar datos de docente </label>
        <label>Nombre:  
          <input 
            className="form-control mb-3"
            onChange={(event) => setNombre(event.target.value)}
            type="text"
          />
        </label>

        <label>Apellido: 
          <input 
            className="form-control mb-3"
            onChange={(event) => setApellido(event.target.value)}
            type="text"
          />
        </label>

        <label>Identificador: 
          <input 
            className="form-control mb-3"
            onChange={(event) => setIdentificador(event.target.value)}
            type="text"
          />
        </label>

        <label>Contraseña: 
          <input 
            className="form-control mb-3"
            onChange={(event) => setContrasenia(event.target.value)}
            type="password"
          />
        </label>

        <button className="btn btn-custom mt-3" onClick={mostrarDatos}>
          Registrar
        </button>

        {}
        {mensaje && (
          <div className={`alert alert-${tipoMensaje} mt-4`} role="alert">
            {mensaje}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
