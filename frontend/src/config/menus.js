import { frontend as rutas } from "../rutas";

const docente = {
    "Empresas":{
        /* "Administración": rutas.DOC_EMPRESAS_ADMINISTRACION,
        "Empresas Registradas": rutas.EMPRESAS_TODAS_REGISTRADAS, */
    },
    "Proyectos":{
        /* "Lista de Proyectos": rutas.DOC_PROYECTOS_LISTA,
        "Crear un Proyecto": rutas.DOC_PROYECTOS_CREAR, */
    },
    "Evaluaciones":{
        "Revisar Planificaciones": rutas.DOC_EVALUACIONES_REVISAR_PLANIFICACION,
        "Revisar Planillas": rutas.DOC_EVALUACIONES_PLANILLAS_SEGUIMIENTO,
        "Generar Planillas": rutas.DOC_GENERAR_PLANILLAS,
    },
    /* "Reportes":{
        "Desempeño de Empresas": rutas.DOC_REPORTES_EMPRESAS,
        "Evaluaciones Realizadas": rutas.DOC_REPORTES_EVAL_REALIZADAS,
        "Estudiantes Asignados": rutas.DOC_REPORTES_EST_ASIGNADOS,
    }, */
}

const estudiante = {
    "Empresas":{
        "Mi empresa": rutas.EST_EMPRESAS_MI_EMPR,
        /* "Empresas Registradas": rutas.EMPRESAS_TODAS_REGISTRADAS, */
    },
    "Proyectos":{
        /* "Catálogo": rutas.EST_PROYECTOS_CATALOGO, */
        "Mis Proyectos": rutas.EST_PROYECTOS_MI_PROY,
    },
    "Evaluaciones":{
        /* "Revisar Evaluaciones": rutas.EST_EVALUACIONES_REVISAR, */
        "Planillas de Seguimiento": rutas.EST_EVALUACIONES_PLANILLA_SEG,
        /* "Registrar Evaluación": rutas.EST_EVALUACIONES_REGISTRAR, */
    },

}

const administrador = {
    "Usuarios":{
        "Registro Docentes": rutas.ADMIN_USUARIOS_GESTIONAR,
        /* "Crear Notificaciones": rutas.ADMIN_USUARIOS_CREAR_NOTIF, */
    },
}

export default {docente, estudiante, administrador}