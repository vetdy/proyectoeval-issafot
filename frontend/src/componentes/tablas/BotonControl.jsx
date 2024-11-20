import plusSVG from "../../assets/plus.svg";
import pencilSVG from "../../assets/pencil-square.svg";
import dashSVG from "../../assets/dash.svg";
import trashSVG from "../../assets/trash.svg";
import crossSVG from "../../assets/x.svg";

const BotonControl = ({ tipo = "<detalle>", pkey = "", handle, ...props }) => {
    const contenido = {
        "<detalle>": () => {
            return "detalle";
        },
        "<agregar>": () => {
            return <img src={plusSVG} alt="+" />;
        },
        "<editar>": () => {
            return <img src={pencilSVG} alt="<_" />;
        },
        "<eliminar>": () => {
            return <img src={dashSVG} alt="-" />;
        },
    };

    const estiloBotonIcono = "border btn-light";

    const estilo = {
        "<detalle>": "btn-eva-info",
        "<agregar>": estiloBotonIcono,
        "<editar>": estiloBotonIcono,
        "<eliminar>": estiloBotonIcono,
    };

    return (
        <button
            className={`btn ${estilo[tipo]}`}
            key={`${pkey}-${tipo}`}
            onClick={handle}
            {...props}
        >
            {contenido[tipo]()}
        </button>
    );
};

export default BotonControl;
