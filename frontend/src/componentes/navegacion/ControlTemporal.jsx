import { useState } from "react";

const Control = ({inicial="", menus, clickHandle}) => {
    const keys = Object.keys(menus);
    const [texto, setTexto] = useState(inicial);
    const [idx, setIdx] = useState(keys.findIndex(k => k === texto));

    const cambiarMenu = () => {
        if(idx + 1 > keys.length - 1){
            clickHandle(menus[keys[0]]);
            setTexto(keys[0]);
            setIdx(0);
        }
        else{
            clickHandle(menus[keys[idx + 1]]);
            setTexto(keys[idx + 1]);
            setIdx(idx + 1);
        }
    }

    return(
        <div >
            <div className="e-control" onClick={cambiarMenu}>
                <i className="bi bi-arrow-left-right fs-6"></i>
            </div>
            <div className="e-text">
                {texto}
            </div>
        </div>
    );
}

export default Control