import { Routes, Route } from "react-router-dom"
import { useState } from "react"
import { Header, Navbar, Control } from "./componentes/navegacion"
import * as paginas from "./paginas"
import menus from "./config/menus"


function App() {
    const [usrMenu, setUsrMenu] = useState(menus.estudiante);

    return (
        <>
            <Header />

            <Navbar menuReferencia={usrMenu}></Navbar>
            <Routes>
                <Route path="/mi-empresa/registro" 
                    element={<paginas.RegistroEmpresa />}
                ></Route>
                <Route path="/registrar/docentes" 
                    element={<paginas.RegistroDocentes />}
                ></Route>
                <Route path="/em-registradas/EmpresasRegistradas" 
                    element={<paginas.EmpresasRegistradas />}
                ></Route>
                <Route path="/mis-planillas" 
                    element={<paginas.PlanillasSeguimiento />}
                ></Route>
                <Route path="/registrar/planificacion" 
                    element={<paginas.RegistroPlanificacion />}
                ></Route>

            </Routes>
            <Control inicial={"estudiante"} menus={menus} clickHandle={setUsrMenu}></Control>
        </>
    )
}

export default App