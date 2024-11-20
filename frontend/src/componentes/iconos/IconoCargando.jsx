import "../../estilos/iconoCargando.styles.css"

const IconoCargando = ({
    tamano = "40px",
    color = "black",
    velocidad = "1s",
    grosor = "3px",
}) => {
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
};

export default IconoCargando;
