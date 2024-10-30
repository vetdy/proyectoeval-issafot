import color from "../../estilos/color";

const TituloRegistros = ({ titulo = "Titulo", rounded = true, my = true }) => {
    return (
        <div
            className={`row ${rounded ? "rounded-3" : ""} shadow-sm m-auto ${
                my ? "my-2" : ""
            } ${color.forms.fondoTitulo}`}
        >
            <div className="col-md-12 py-2">
                <h2
                    className={`
                        text-center fw-bold text-uppercase 
                        text-shadow m-auto ${color.forms.textoTitulo}`}
                >
                    {titulo}
                </h2>
            </div>
        </div>
    );
};

export default TituloRegistros;
