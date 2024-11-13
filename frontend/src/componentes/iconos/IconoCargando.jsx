import "../../estilos/iconoCargando.styles.css"

const IconoCargando = ({
    tipo = "circulo",
    tamano = "40px",
    color = "black",
    velocidad = "1s",
    grosor = "3px",
    opacidad = ".1",
}) => {
    if( tipo === "circulo" ){
        return (
            <div className="pg-loading-container"
                style={{
                    "--uib-size": tamano,
                    "--uib-color": color,
                    "--uib-speed": velocidad,
                    "--uib-stroke": grosor
                }}
            >
                <div className="pg-loading-line"></div>
                <div className="pg-loading-line"></div>
                <div className="pg-loading-line"></div>
                <div className="pg-loading-line"></div>
                <div className="pg-loading-line"></div>
                <div className="pg-loading-line"></div>
                <div className="pg-loading-line"></div>
                <div className="pg-loading-line"></div>
                <div className="pg-loading-line"></div>
                <div className="pg-loading-line"></div>
                <div className="pg-loading-line"></div>
                <div className="pg-loading-line"></div>
            </div>
        );
    }

    if(tipo === "linea"){
        return(
            <div 
                className="line-loading"
                style={{
                    "--uib-size": tamano,
                    "--uib-color": color,
                    "--uib-speed": velocidad,
                    "--uib-stroke": grosor,
                    "--uib-bg-opacity": opacidad
                }}
            ></div>
        );
    }
    return <div className="">cargando...</div>
};

export default IconoCargando;
