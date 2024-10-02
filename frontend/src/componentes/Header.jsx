import {IconoLogo, IconoCampana, IconoUsuario} from "./iconos"
import color from "@src/estilos/color"

function Boton({children}){

    return(
        <button className={"btn border-0 " + color.boton.fondo + " " + color.boton.texto}>
            {children}
        </button>
    )
}

function Header(){

    return(
        <header 
            className={"d-flex justify-content-between border-bottom border-dark " + color.navbar.fondo}
            style={{height:"4rem"}}
        >
            <div className="d-flex align-items-center">
                <div style={{height:"4rem", width:"4rem"}}>
                    <IconoLogo />
                </div>
                <h1 className={color.texto_navbar}>Proyecto EVA</h1>
            </div>

            <div className="d-flex align-items-center">
                <Boton><IconoCampana /></Boton>
                <Boton><IconoUsuario /></Boton>
            </div>
        </header>
    );
}

export default Header