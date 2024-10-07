import { Routes, Route } from "react-router-dom"

import { Header, Navbar } from "./componentes/navegacion"
import * as paginas from "./paginas"
import menus from "./config/menus"


function App() {

    return (
        <>
            <Header />

            <Navbar menuReferencia={menus.estudiante}></Navbar>
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


            </Routes>
            
        </>
    )
}

export default App