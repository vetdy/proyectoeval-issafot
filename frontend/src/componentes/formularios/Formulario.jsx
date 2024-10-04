import color from "@src/estilos/color";

function Formulario({children, tituloFormulario="", nombreBoton="", ...props}){
    return(
        <div className="container-fluid p-2">
            <div className={`row rounded-3 shadow-sm m-auto ${color.forms.fondoTitulo}`}>
                <div className="col-md-12 py-2">
                    <h2 
                        className={`text-center fw-bold text-uppercase text-shadow m-auto ${color.forms.textoTitulo}`}
                    >
                        {tituloFormulario}
                    </h2>
                </div>
            </div>

            <div className={`row rounded-3 py-2 m-auto ${color.forms.fondoCuerpo}`}>
                <form className="container" {...props}>
                    {children}

                    <div className="row m-auto">
                        <div className="col-md-4 py-2 m-auto">
                            <input 
                                className={`btn ${color.forms.estiloBoton} fw-bold text-uppercase w-100 ${color.forms.textoBoton}`} 
                                type="submit" 
                                value={nombreBoton}>
                            </input>
                        </div>
                    </div>
                </form>
            </div>            
        </div>
    );
}

export default Formulario