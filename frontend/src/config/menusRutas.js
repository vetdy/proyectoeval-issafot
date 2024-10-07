const docente = {
    "Empresas":{
        "Administracion": "/empresas/admin",
        "Empresas Registradas": "/empresas",
    },
    "Proyectos":{
        "Lista de Proyectos": "/proyectos",
        "Crear un Proyecto": "/proyectos/nuevo",
    },
    "Evaluaciones":{
        "Crear Evaluacion Final": "/evaluaciones/nuevo",
        "Recuperar Evaluaciones": "/evaluaciones",
    },
    "Reportes":{
        "Desenpeño de Empresas": "/reportes/desempeno",
        "Evaluaciones Realizadas": "/reportes/evaluaciones",
        "Estudiantes Asignados": "/reportes/estudiantes",
    },
}

const estudiante = {
    "Empresas":{
        "Mi empresa": "/mi-empresa/registro",
        "Empresas Registradas": "/em-registradas/EmpresasRegistradas",
    },
    "Proyectos":{
        "Catálogo": "/proyectos/catalogo",
        "Mis Proyectos": "/mi-proyecto",
    },
    "Evaluaciones":{
        "Revisar Evaluaciones": "/mis-evaluaciones",
        "Planillas de Seguimiento": "/mis-planillas",
        "Registrar Evaluación": "/nueva-evaluacion",
    },

}

const administrador = {
    "Usuarios":{
        "Gestionar Usuarios": "/registrar/docente",
        "Crear Notificaciones": "/gestion/notificaciones",
    },
}

export default {docente, estudiante, administrador}