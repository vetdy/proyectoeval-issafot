import color from "../../estilos/color";

function Formulario({children, tituloFormulario="", nombreBoton="", enviando=false, ...props}){
    return(
        <div className="container p-2">
            <div className={`row rounded-3 shadow-sm m-auto ${color.forms.fondoTitulo}`}>
                <div className="col-md-12 py-2">
                    <h2 
                        className={`
                            text-center fw-bold text-uppercase 
                            text-shadow m-auto ${color.forms.textoTitulo}`}
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
                                className={`
                                    btn fw-bold text-uppercase w-100 
                                    ${color.forms.textoBoton}
                                    ${color.forms.estiloBoton} 
                                `} 
                                type="submit" 
                                value={nombreBoton}
                                disabled={enviando}
                            ></input>
                        </div>
                    </div>
                </form>
            </div>         
        </div>
    );
}

export default Formulario