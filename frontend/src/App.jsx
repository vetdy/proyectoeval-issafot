import { Routes, Route } from "react-router-dom"
import Header from "@src/componentes/navegacion/Header"
import menusRutas from "@src/config/menusRutas"
import Navbar from "@src/componentes/navegacion/Navbar"
import RegistroEmpresa from "@src/paginas/RegistroEmpresa"
import RegistroDocente from "@src/paginas/RegistroDocente"
import EmpresasRegistradas from "@src/paginas/EmpresasRegistradas"

function App() {

    return (
        <>
            <Header />
            <Navbar menuReferencia={menusRutas.estudiante}></Navbar>
            <Routes>
                <Route path="/mi-empresa/registro" element={<RegistroEmpresa />}></Route>
                <Route path="/registrar/docente" element={<RegistroDocente />}></Route>
                <Route path="/em-registradas/EmpresasRegistradas" element={<EmpresasRegistradas />}></Route>

            </Routes>
            
        </>
    )
}

export default App