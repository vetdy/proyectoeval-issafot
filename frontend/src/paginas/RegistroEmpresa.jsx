import logo from "/logo.png"

function RegistroEmpresa(){
    return(
        <div className="container w-75">
            <div className="row mb-4">
                <h2 className="text-center">Registro de Empresa</h2>
            </div>
            
            <form>
                <div className="row mb-2">
                    <div className="col-md-6">
                        <div className="form-group mb-1">
                            <input className="form-control" type="text" name="Nombre Corto" id="nombrect" placeholder="Nombre Corto"></input>
                        </div>
                        <div className="form-group mb-1">
                            <input className="form-control" type="text" name="Nombre Largo" id="nombrelg" placeholder="Nombre Largo"></input>
                        </div>
                        <div className="form-group mb-1">
                            <input className="form-control" type="text" name="Telefono" id="telefono" placeholder="Telefono"></input>                            
                        </div>
                        <div className="form-group mb-1">
                            <input className="form-control" type="text" name="Correo" id="correo" placeholder="Correo"></input>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="d-flex justify-content-center">
                            <img src={logo} width="160" alt="Vista previa" className="img-fluid"></img>
                        </div>
                        <div className="d-flex justify-content-center">
                            <div className="form-group">
                                <input type="file" name="logo" id="logo" className="form-control-file"></input>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <input className="btn btn-primary col-sm-3" type="button" value="Registrar" name="submit"></input>
                </div>
            </form>

        </div>
    );
}

export default RegistroEmpresa