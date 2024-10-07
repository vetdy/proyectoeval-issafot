import { useState } from 'react';
import logo from "/logo.png";

function RegistroDocentes() {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [identificador, setIdentificador] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [codsis, setCodsis] = useState('');
    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] = useState('');

    const [errores, setErrores] = useState({
        nombre: '',
        apellido: '',
        identificador: '',
        contrasena: '',
        codsis: '',
        correo: '',
        telefono: '',
    });

    const [confirmacion, setConfirmacion] = useState('');  // Nuevo estado para el mensaje de confirmación
    const [mostrarContrasena, setMostrarContrasena] = useState(false);//mostra contra

    const validarNombre = (valor) => {
        setNombre(valor);
        if (valor.length > 32) {
            setErrores({ ...errores, nombre: 'El nombre no debe exceder 32 caracteres.' });
        } else {
            setErrores({ ...errores, nombre: '' });
        }
    };

    const validarApellido = (valor) => {
        setApellido(valor);
        if (valor.length > 100) {
            setErrores({ ...errores, apellido: 'El apellido no puede exceder 100 caracteres.' });
        } else {
            setErrores({ ...errores, apellido: '' });
        }
    };

    const validarIdentificador = (valor) => {
        setIdentificador(valor);
        if (!/^\d*$/.test(valor)) {
            setErrores({ ...errores, identificador: 'El identificador solo debe contener números.' });
        } else if (valor.length > 9) {
            setErrores({ ...errores, identificador: 'El identificador no puede exceder 9 caracteres.' });
        } else {
            setErrores({ ...errores, identificador: '' });
        }
    };

    const validarContrasena = () => {
        if (!/^(?=.*[A-Z])(?=.*\d).{6,32}$/.test(contrasena)) {
            setErrores({ ...errores, contrasena: 'La contraseña debe contener una mayúsculas, números y no exceder los 32 caracteres.' });
        } else {
            setErrores({ ...errores, contrasena: '' });
        }
    };

    const validarCodsis = () => {
        if (!/^\d{9}$/.test(codsis)) {
            setErrores({ ...errores, codsis: 'El código SIS debe contener exactanente 9 números.' });
        } else {
            setErrores({ ...errores, codsis: '' });
        }
    };

    const validarCorreo = () => {
        if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(correo)) {
            setErrores({ ...errores, correo: 'El correo electrónico no es válido.' });
        } else {
            setErrores({ ...errores, correo: '' });
        }
    };

    const validarTelefono = () => {
        if (!/^\d*$/.test(telefono)) {
            setErrores({ ...errores, telefono: 'El teléfono solo debe contener números.' });
        } else {
            setErrores({ ...errores, telefono: '' });
        }
    };

    const registrarDocente = () => {
        //tal locica
        setConfirmacion('El docente ha sido registrado exitosamente.');  
        if(
            !errores.nombre && !errores.apellido && !errores.identificador && !errores.contrasena 
            && !errores.correo && !errores.codsis && !errores.telefono
        ){
            setConfirmacion('El docente se ha registrado');
        }else{
            setConfirmacion('');
        }
    };


    return (
        <div className="container w-75">
            <div className="row mb-5">
                <h2 className="text-center">Registrar Docentes</h2>
            </div>

            <form>
                <div className="row mb-2">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <div className="form-group mb-1">
                            <input
                                className="form-control"
                                type="text"
                                name="Nombre"
                                id="nombredocente"
                                placeholder="Nombre"
                                value={nombre}
                                onChange={(e) => validarNombre(e.target.value)}
                            />
                            {errores.nombre && <small className="text-danger">{errores.nombre}</small>}
                        </div>

                        <div className="form-group mb-1">
                            <input
                                className="form-control"
                                type="text"
                                name="Apellido"
                                id="apellidodocente"
                                placeholder="Apellido"
                                value={apellido}
                                onChange={(e) => validarApellido(e.target.value)}
                            />
                            {errores.apellido && <small className="text-danger">{errores.apellido}</small>}
                        </div>

                        <div className="form-group mb-1">
                            <input
                                className="form-control"
                                type="number"
                                name="Identificador"
                                id="identificadordocente"
                                placeholder="Identificador"
                                value={identificador}
                                onChange={(e) => validarIdentificador(e.target.value)}
                            />
                            {errores.identificador && <small className="text-danger">{errores.identificador}</small>}
                        </div>

                        <div className="form-group mb-1">
                            <div className="input-group">
                                <input
                                    className="form-control"
                                    type={mostrarContrasena ? "text" : "password"}  // Cambia entre texto y contraseña
                                    name="Contrasena"
                                    id="contrasenadocente"
                                    placeholder="Contraseña"
                                    value={contrasena}
                                    onChange={(e) => setContrasena(e.target.value)}
                                    onBlur={validarContrasena}
                                />
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={() => setMostrarContrasena(!mostrarContrasena)}
                                >
                                    {mostrarContrasena ? "Ocultar" : "Mostrar"}
                                </button>
                            </div>
                            {errores.contrasena && <small className="text-danger">{errores.contrasena}</small>}
                        </div>

                        <div className="form-group mb-1">
                            <input
                                className="form-control"
                                type="number"
                                name="Codsis"
                                id="codsisdocente"
                                placeholder="Código SIS"
                                value={codsis}
                                onChange={(e) => setCodsis(e.target.value)}
                                onBlur={validarCodsis}
                            />
                            {errores.codsis && <small className="text-danger">{errores.codsis}</small>}
                        </div>

                        <div className="form-group mb-1">
                            <input
                                className="form-control"
                                type="text"
                                name="Correo"
                                id="correo"
                                placeholder="Correo"
                                value={correo}
                                onChange={(e) => setCorreo(e.target.value)}
                                onBlur={validarCorreo}
                            />
                            {errores.correo && <small className="text-danger">{errores.correo}</small>}
                        </div>

                        <div className="form-group mb-1">
                            <input
                                className="form-control"
                                type="number"
                                name="Telefono"
                                id="telefono"
                                placeholder="Teléfono"
                                value={telefono}
                                onChange={(e) => setTelefono(e.target.value)}
                                onBlur={validarTelefono}
                            />
                            {errores.telefono && <small className="text-danger">{errores.telefono}</small>}
                        </div>
                    </div>
                    <div className="col-md-3"></div>
                </div>

                <div className="row justify-content-center">
                    <input className="btn btn-primary col-sm-3" type="button" value="Registrar" onClick={registrarDocente} />
                </div>

                {/* Mostrar mensaje de confirmación si existe */}
                {confirmacion && (
                    <div className="row justify-content-center mt-3">
                        <div className="col-sm-6">
                            <div className="alert alert-success text-center">
                                {confirmacion}
                            </div>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
}

export default RegistroDocentes;
