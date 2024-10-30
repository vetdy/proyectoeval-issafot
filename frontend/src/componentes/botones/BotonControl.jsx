import plusSVG from "../../assets/plus.svg";
import pencilSVG from "../../assets/pencil-square.svg";
import dashSVG from "../../assets/dash.svg";
import trashSVG from "../../assets/trash.svg";
import crossSVG from "../../assets/x.svg";

const BotonControl = ({ tipo = "<detalle>", pkey = "", handle, ...props}) => {
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
            return <img src={trashSVG} alt="-" />;
        },
    };

    const estiloBotonIcono = "py-1 px-2 btn-eva-info border-0 ";

    const estilo = {
        "<detalle>": "btn-eva-info",
        "<agregar>": estiloBotonIcono,
        "<editar>": estiloBotonIcono,
        "<eliminar>": estiloBotonIcono,
    };

    return (
        <button
            className={`btn mx-1 ${estilo[tipo]}`}
            key={`${pkey}-${tipo}`}
            onClick={handle}
            {...props}
        >
            {contenido[tipo]()}
        </button>
    );
};

export default BotonControl;
