import { useState, useEffect} from "react";
import { Link, useLocation } from "react-router-dom";
import color from "@src/estilos/color";

function Navbar({menuReferencia={}}){    
    const estadoInicialMenus = Object.fromEntries(Object.keys(menuReferencia).map(item => [item, false]));
    const [verMenu, setVerMenu] = useState(estadoInicialMenus);
    const [menuAbierto, setMenuAbierto] = useState(false);
    const ubicacion = useLocation();

    const abrirMenu = (menu) =>{
        setVerMenu({...estadoInicialMenus, [menu]: true});
        setMenuAbierto(true);
    };

    const cerrarMenu = () =>{
        setVerMenu(estadoInicialMenus);
        setMenuAbierto(false);
    };

    const controlMenu = (menu) => {
        if (verMenu[menu]){
            cerrarMenu();
        }
        else{
            abrirMenu(menu);
        }
    }
    
    const click_ventana = (ev) =>{
        if(! ev.target.classList.contains("nav-link") && ! ev.target.classList.contains("dropdown-item")){
            cerrarMenu();
        }
    };
    
    useEffect(() =>{
        cerrarMenu();
    }, [ubicacion]);
    
    useEffect(()=>{
        if(menuAbierto){
            document.addEventListener("click", click_ventana);
        }
        return () =>{
            document.removeEventListener("click", click_ventana);
        };
    });

    const NavMenu = ({children, id, nombre}) => {
        return(
            <li className="nav-item dropdown">
            <button className={`nav-link dropdown-toggle ${color.navbar.texto}`} onClick={() => controlMenu(id)}
            >
                {nombre}
            </button>
            
            <div className={`dropdown-menu ${verMenu[id] ? "show"  : ""} ${color.navbar.subfondo}` }>
                {children}
            </div>
        </li>
        );
    }

    const NavItem = ({children, to}) =>{
        return(
            <Link to={to} className={`dropdown-item ${color.navbar.subtexto}`}>{children}</Link>
        );
    }

    return(
        <nav className={`navbar navbar-expand-sm shadow-sm ${color.navbar.fondo} ${color.navbar.texto}`}>
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