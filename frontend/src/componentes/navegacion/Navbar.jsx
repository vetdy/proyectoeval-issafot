import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import color from "@src/estilos/color";

function Navbar({menuReferencia={}}){    
    const estadoInicialMenus = Object.fromEntries(Object.keys(menuReferencia).map(item => [item, false]));
    const [verMenu, setVerMenu] = useState(estadoInicialMenus);
    const ubicacion = useLocation();

    const abrirMenu = (menu) => {
        if (verMenu[menu]){
            setVerMenu(estadoInicialMenus);
        }
        else{
            setVerMenu({...estadoInicialMenus, [menu]: true});
        }
    }

    useEffect(() =>{
        setVerMenu(estadoInicialMenus);
    }, [ubicacion]);

    const NavMenu = ({children, id, nombre}) => {
        return(
            <li className="nav-item dropdown">
            <button className="nav-link dropdown-toggle" onClick={() => abrirMenu(id)}
            >
                {nombre}
            </button>
            <div className={`dropdown-menu ${verMenu[id] ? "show" : ""} `}>
                {children}
            </div>
        </li>
        );
    }

    const NavItem = ({children, to}) =>{
        return(
            <Link to={to} className="dropdown-item">{children}</Link>
        );
    }

    return(
        <nav className={"navbar navbar-expand-sm shadow-sm " + color.navbar.fondo}>
            <ul className="navbar-nav ml-auto">
                {Object.entries(menuReferencia).map( ([nombreMenu, entradasMenu]) => (
                    <NavMenu key={nombreMenu} id={nombreMenu} nombre={nombreMenu}>
                        {Object.entries(entradasMenu).map(([nombre, ruta]) => (
                            <NavItem key={ruta} to={ruta}>{nombre}</NavItem>
                        ))}
                    </NavMenu>
                ))}
            </ul>
        </nav>
    );
}

export default Navbar