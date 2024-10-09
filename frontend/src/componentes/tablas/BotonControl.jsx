import plusSVG from "../../assets/plus.svg";
import pencilSVG from "../../assets/pencil-square.svg";
import dashSVG from "../../assets/dash.svg";
import trashSVG from "../../assets/trash.svg";
import crossSVG from "../../assets/x.svg";

const BotonControl = ({ tipo = "<boton>", children, handle, ...props }) => {
    return (
        <button
            className={`btn ${tipo === "<boton>" ? "btn-eva-info" : ""}`}
            onClick={handle}
            {...props}
        >
            {tipo === "<agregar>" && (
                <img src={plusSVG} alt="" />
            )}
            {tipo === "<editar>" && (
                
                <img src={pencilSVG} alt="" />
            )}
            {tipo === "<eliminar>" && (
                <img src={dashSVG} alt="" />
            )}
            {children}
        </button>
    );
};

export default BotonControl;
