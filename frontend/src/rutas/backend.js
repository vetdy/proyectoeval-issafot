const URL_BACKEND = import.meta.env.VITE_SERVIDOR_BACKEND_URL;

export const REGISTRO_EMPRESA = `${URL_BACKEND}/api/empresa`;

export const PLANILLA_SEGUIMIENTO_EMPRESA = `${URL_BACKEND}/api/planilla_seguimiento/proyecto_empresa`;
export const PLANILLA_EVALUACION_EMPRESA = `${URL_BACKEND}/api/evaluacion/proyecto_empresa`;
export const REGISTRAR_PLANIFICACION_EMPRESA = `${URL_BACKEND}/api/planificacion_tareas`;
export const ELEMENTO_PLANIFICACION_PROYECTO_EMPRESA = `${URL_BACKEND}/api/planificacion`;
export const PROYECTOS_EMPRESA = `${URL_BACKEND}/api/proyecto_empresa/empresa`;
export const PLANIFICACION_PROYECTO_EMPRESA = `${URL_BACKEND}/api/planificacion/proyecto_empresa/item`;
export const ESTADO_PLANIFICACION_PROYECTO_EMPRESA = `${URL_BACKEND}/api/revision_planificacion/proyecto_empresa`;
export const ESTADO_PLANIFICACION = `${URL_BACKEND}/api/revision_planificacion`;

export const ITEMS_PLANILLA_SEGUIMIENTO = `${URL_BACKEND}/api/item_planilla/planilla_seguimiento`;
export const ITEM_PLANILLA_SEGUIMIENTO = `${URL_BACKEND}/api/item_planilla`;
export const ITEMS_PLANILLA_EVALUACION = `${URL_BACKEND}/api/tarea/evaluacion`;

export const PLANILLAS_DOCENTE_SEGUIMIENTO = `${URL_BACKEND}/api/planilla_seguimiento/semana`;
export const ASISTENCIA_PLANILLA_SEGUIMIENTO = `${URL_BACKEND}/api/planilla_seguimiento/asistencia`
export const PROYECTOS_EMPRESA_DOCENTE = `${URL_BACKEND}/api/proyecto_empresa/docente`;
export const PLANILLAS_DOCENTE_EVALUACION = `${URL_BACKEND}/api/evaluacion/semana`;

export const REGISTRO_DOCENTE = `${URL_BACKEND}/api/docente`; /* REGISTRAR AQUI HACER ALGO ASQIUI  */