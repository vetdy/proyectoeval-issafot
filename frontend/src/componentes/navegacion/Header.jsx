import {IconoLogo, IconoCampana, IconoUsuario} from "../iconos";
import { Link } from "react-router-dom";
import color from "../../estilos/color";

function Boton({children}){

    return(
        <button className={`btn border-0 ${color.navbar.texto}`}>
            {children}
        </button>
    )
}

function Header(){

    return(
        <header 
            className={`d-flex justify-content-between border-bottom border-dark ${color.navbar.fondo}`}
            style={{height:"4rem"}}
        >
            <div className="d-flex align-items-center">
                <div style={{height:"4rem", width:"4rem"}}>
                    <IconoLogo />
                </div>
                
                <Link className={`${color.navbar.texto} h1 text-decoration-none fw-bold user-select-none text-shadow `} 
                    to={"/"}
                >Proyecto EVA
                </Link>
            </div>

            <div className="d-flex align-items-center">
                <Boton><IconoCampana /></Boton>
                <Boton><IconoUsuario /></Boton>
            </div>
        </header>
    );
}

export default Header