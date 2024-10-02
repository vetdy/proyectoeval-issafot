import { useState } from 'react';

function App() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [identificador, setIdentificador] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [Codigosis, setCodigosis] = useState("");
  const [Correo, setCorreo] = useState("");
  const [Telefono, setTelefono] = useState("");
  
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
       <h1> <label >Registrar datos de docente </label></h1>
        <label>
          <input
            
            className="form-control mb-3"
            onChange={(event) => setNombre(event.target.value)}
            type="text"
            placeholder='Nombre' 
          />
        </label>

        <label>
          <input 
            
            className="form-control mb-3"
            onChange={(event) => setApellido(event.target.value)}
            type="text"
            placeholder='Apellido'
          />
        </label>

        <label> 
          <input 
            className="form-control mb-3"
            onChange={(event) => setIdentificador(event.target.value)}
            type="text"
            placeholder='Identificador'
          />
        </label>

        <label>
          <input 
            className="form-control mb-3"
            onChange={(event) => setContrasenia(event.target.value)}
            type="password"
            placeholder='Contraseña'
          />
        </label>

        <label>
          <input 
            className="form-control mb-3"
            onChange={(event) => setCodigosis(event.target.value)}
            type="text"
            placeholder='Código SIS'
          />
        </label>

        <label>
          <input 
            className="form-control mb-3"
            onChange={(event) => setCorreo(event.target.value)}
            type="text"
            placeholder='Correo'
          />
        </label>

        <label>
          <input 
            className="form-control mb-3"
            onChange={(event) => setTelefono(event.target.value)}
            type="text"
            placeholder='Teléfono'
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
