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
                <Route path="/mis-planillas" 
                    element={<paginas.PlanillasSeguimiento />}
                ></Route>
                <Route path="/mi-proyecto"
                    element={<paginas.ProyectosEstudiante />}
                ></Route>
                <Route path="/mi-proyecto/planificacion"
                    element={<paginas.OtroRegistroPlanificacion />}
                ></Route>
                <Route path="/empresas"
                    element={<paginas.Empresas />}
                ></Route>
                <Route path="/planillas"
                    element={<paginas.PlanillasDocente />}
                ></Route>
                <Route path="/planillas/revision"
                    element={<paginas.RevisionPlanilla />}
                ></Route>
                <Route path="/recuperar/resultados"
                    element={<paginas.RecuperarResultadosEvaluacion />}
                ></Route>
                <Route path="/gestion-empresas"
                    element={<paginas.AdminEmpresasDocente />}
                ></Route>
                <Route path="/evaluaciones/planes-empresa"
                    element={<paginas.RevisionPlanificacionesDocente />}
                ></Route>
                <Route path="evaluaciones/planes-empresa/revision"
                    element={<paginas.RevisionPlanificacionDocente />}
                ></Route>
                <Route path="/planillas/generar"
                    element={<paginas.generarPLanillasDeSeguimientoYEvaSemanal/>}
                ></Route>
            </Routes>
            <Control inicial={"estudiante"} menus={menus} clickHandle={setUsrMenu}></Control>
        </>
    )
}

export default App