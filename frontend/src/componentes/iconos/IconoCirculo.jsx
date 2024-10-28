import React from "react";

function IconoCirculo({ color = "bg-eva-primary", tamano = "1.2rem" }) {
    return (
        <span
            className={`img-thumbnail rounded-5 ${color}`}
            style={{
                width: tamano,
                height: tamano,
                display: "inline-block",
                minWidth: tamano,
                minHeight: tamano,
            }}
        />
    );
}

export default IconoCirculo;
