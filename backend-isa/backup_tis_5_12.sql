--
-- PostgreSQL database dump
--

-- Dumped from database version 12.20 (Ubuntu 12.20-1.pgdg24.04+1)
-- Dumped by pg_dump version 16.3 (Ubuntu 16.3-0ubuntu0.24.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: asistencia_evaluacion; Type: TABLE; Schema: public; Owner: tis
--

CREATE TABLE public.asistencia_evaluacion (
    id bigint NOT NULL,
    presente boolean DEFAULT true NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    observacion character varying(255) DEFAULT ''::character varying NOT NULL,
    id_evaluacion bigint NOT NULL,
    id_usuario bigint NOT NULL
);


ALTER TABLE public.asistencia_evaluacion OWNER TO tis;

--
-- Name: asistencia_evaluacion_id_seq; Type: SEQUENCE; Schema: public; Owner: tis
--

CREATE SEQUENCE public.asistencia_evaluacion_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.asistencia_evaluacion_id_seq OWNER TO tis;

--
-- Name: asistencia_evaluacion_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tis
--

ALTER SEQUENCE public.asistencia_evaluacion_id_seq OWNED BY public.asistencia_evaluacion.id;


--
-- Name: asistencia_planilla_seguimiento; Type: TABLE; Schema: public; Owner: tis
--

CREATE TABLE public.asistencia_planilla_seguimiento (
    id bigint NOT NULL,
    presente boolean DEFAULT true NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    observacion character varying(255) DEFAULT ''::character varying NOT NULL,
    id_planilla_seguimiento bigint NOT NULL,
    id_usuario bigint NOT NULL
);


ALTER TABLE public.asistencia_planilla_seguimiento OWNER TO tis;

--
-- Name: asistencia_planilla_seguimiento_id_seq; Type: SEQUENCE; Schema: public; Owner: tis
--

CREATE SEQUENCE public.asistencia_planilla_seguimiento_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.asistencia_planilla_seguimiento_id_seq OWNER TO tis;

--
-- Name: asistencia_planilla_seguimiento_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tis
--

ALTER SEQUENCE public.asistencia_planilla_seguimiento_id_seq OWNED BY public.asistencia_planilla_seguimiento.id;


--
-- Name: categorias; Type: TABLE; Schema: public; Owner: tis
--

CREATE TABLE public.categorias (
    id bigint NOT NULL,
    nombre character varying(255) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.categorias OWNER TO tis;

--
-- Name: categorias_id_seq; Type: SEQUENCE; Schema: public; Owner: tis
--

CREATE SEQUENCE public.categorias_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.categorias_id_seq OWNER TO tis;

--
-- Name: categorias_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tis
--

ALTER SEQUENCE public.categorias_id_seq OWNED BY public.categorias.id;


--
-- Name: documento_empresas; Type: TABLE; Schema: public; Owner: tis
--

CREATE TABLE public.documento_empresas (
    id bigint NOT NULL,
    titulo character varying(255) NOT NULL,
    url_ubicacion character varying(255) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    id_empresa bigint NOT NULL
);


ALTER TABLE public.documento_empresas OWNER TO tis;

--
-- Name: documento_empresas_id_seq; Type: SEQUENCE; Schema: public; Owner: tis
--

CREATE SEQUENCE public.documento_empresas_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.documento_empresas_id_seq OWNER TO tis;

--
-- Name: documento_empresas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tis
--

ALTER SEQUENCE public.documento_empresas_id_seq OWNED BY public.documento_empresas.id;


--
-- Name: documento_proyectos; Type: TABLE; Schema: public; Owner: tis
--

CREATE TABLE public.documento_proyectos (
    id bigint NOT NULL,
    titulo character varying(255) NOT NULL,
    url_ubicacion character varying(255) NOT NULL,
    id_proyecto bigint NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.documento_proyectos OWNER TO tis;

--
-- Name: documento_proyectos_id_seq; Type: SEQUENCE; Schema: public; Owner: tis
--

CREATE SEQUENCE public.documento_proyectos_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.documento_proyectos_id_seq OWNER TO tis;

--
-- Name: documento_proyectos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tis
--

ALTER SEQUENCE public.documento_proyectos_id_seq OWNED BY public.documento_proyectos.id;


--
-- Name: empresas; Type: TABLE; Schema: public; Owner: tis
--

CREATE TABLE public.empresas (
    id bigint NOT NULL,
    nombre_corto character varying(255) NOT NULL,
    nombre_largo character varying(255) NOT NULL,
    telefono character varying(255) NOT NULL,
    correo character varying(255) NOT NULL,
    url_logo character varying(255) NOT NULL,
    id_representante_legal bigint NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.empresas OWNER TO tis;

--
-- Name: empresas_id_seq; Type: SEQUENCE; Schema: public; Owner: tis
--

CREATE SEQUENCE public.empresas_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.empresas_id_seq OWNER TO tis;

--
-- Name: empresas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tis
--

ALTER SEQUENCE public.empresas_id_seq OWNED BY public.empresas.id;


--
-- Name: estado_contratos; Type: TABLE; Schema: public; Owner: tis
--

CREATE TABLE public.estado_contratos (
    id bigint NOT NULL,
    nombre character varying(255) NOT NULL,
    descripcion character varying(255) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.estado_contratos OWNER TO tis;

--
-- Name: estado_contratos_id_seq; Type: SEQUENCE; Schema: public; Owner: tis
--

CREATE SEQUENCE public.estado_contratos_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.estado_contratos_id_seq OWNER TO tis;

--
-- Name: estado_contratos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tis
--

ALTER SEQUENCE public.estado_contratos_id_seq OWNED BY public.estado_contratos.id;


--
-- Name: estado_planificacion; Type: TABLE; Schema: public; Owner: tis
--

CREATE TABLE public.estado_planificacion (
    id bigint NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    estado character varying(255) NOT NULL,
    descripcion character varying(255) NOT NULL
);


ALTER TABLE public.estado_planificacion OWNER TO tis;

--
-- Name: estado_planificacion_id_seq; Type: SEQUENCE; Schema: public; Owner: tis
--

CREATE SEQUENCE public.estado_planificacion_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.estado_planificacion_id_seq OWNER TO tis;

--
-- Name: estado_planificacion_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tis
--

ALTER SEQUENCE public.estado_planificacion_id_seq OWNED BY public.estado_planificacion.id;


--
-- Name: evaluacions; Type: TABLE; Schema: public; Owner: tis
--

CREATE TABLE public.evaluacions (
    id bigint NOT NULL,
    titulo character varying(255) NOT NULL,
    fecha_revision date NOT NULL,
    hora_revision time(0) without time zone NOT NULL,
    concluido boolean DEFAULT false NOT NULL,
    nota integer DEFAULT 0 NOT NULL,
    id_proyecto_empresa bigint NOT NULL,
    id_tipo_evaluacion bigint NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.evaluacions OWNER TO tis;

--
-- Name: evaluacions_id_seq; Type: SEQUENCE; Schema: public; Owner: tis
--

CREATE SEQUENCE public.evaluacions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.evaluacions_id_seq OWNER TO tis;

--
-- Name: evaluacions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tis
--

ALTER SEQUENCE public.evaluacions_id_seq OWNED BY public.evaluacions.id;


--
-- Name: failed_jobs; Type: TABLE; Schema: public; Owner: tis
--

CREATE TABLE public.failed_jobs (
    id bigint NOT NULL,
    uuid character varying(255) NOT NULL,
    connection text NOT NULL,
    queue text NOT NULL,
    payload text NOT NULL,
    exception text NOT NULL,
    failed_at timestamp(0) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.failed_jobs OWNER TO tis;

--
-- Name: failed_jobs_id_seq; Type: SEQUENCE; Schema: public; Owner: tis
--

CREATE SEQUENCE public.failed_jobs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.failed_jobs_id_seq OWNER TO tis;

--
-- Name: failed_jobs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tis
--

ALTER SEQUENCE public.failed_jobs_id_seq OWNED BY public.failed_jobs.id;


--
-- Name: item_planificacion; Type: TABLE; Schema: public; Owner: tis
--

CREATE TABLE public.item_planificacion (
    id bigint NOT NULL,
    nombre character varying(255) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    id_planificacion character varying(255) NOT NULL
);


ALTER TABLE public.item_planificacion OWNER TO tis;

--
-- Name: item_planificacion_id_seq; Type: SEQUENCE; Schema: public; Owner: tis
--

CREATE SEQUENCE public.item_planificacion_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.item_planificacion_id_seq OWNER TO tis;

--
-- Name: item_planificacion_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tis
--

ALTER SEQUENCE public.item_planificacion_id_seq OWNED BY public.item_planificacion.id;


--
-- Name: item_planillas; Type: TABLE; Schema: public; Owner: tis
--

CREATE TABLE public.item_planillas (
    id bigint NOT NULL,
    titulo character varying(255) NOT NULL,
    generada boolean DEFAULT false NOT NULL,
    observacion character varying(255) DEFAULT ''::character varying NOT NULL,
    id_planilla_seguimiento bigint NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.item_planillas OWNER TO tis;

--
-- Name: item_planillas_id_seq; Type: SEQUENCE; Schema: public; Owner: tis
--

CREATE SEQUENCE public.item_planillas_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.item_planillas_id_seq OWNER TO tis;

--
-- Name: item_planillas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tis
--

ALTER SEQUENCE public.item_planillas_id_seq OWNED BY public.item_planillas.id;


--
-- Name: migrations; Type: TABLE; Schema: public; Owner: tis
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    migration character varying(255) NOT NULL,
    batch integer NOT NULL
);


ALTER TABLE public.migrations OWNER TO tis;

--
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: tis
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.migrations_id_seq OWNER TO tis;

--
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tis
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- Name: password_resets; Type: TABLE; Schema: public; Owner: tis
--

CREATE TABLE public.password_resets (
    email character varying(255) NOT NULL,
    token character varying(255) NOT NULL,
    created_at timestamp(0) without time zone
);


ALTER TABLE public.password_resets OWNER TO tis;

--
-- Name: personal_access_tokens; Type: TABLE; Schema: public; Owner: tis
--

CREATE TABLE public.personal_access_tokens (
    id bigint NOT NULL,
    tokenable_type character varying(255) NOT NULL,
    tokenable_id bigint NOT NULL,
    name character varying(255) NOT NULL,
    token character varying(64) NOT NULL,
    abilities text,
    last_used_at timestamp(0) without time zone,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.personal_access_tokens OWNER TO tis;

--
-- Name: personal_access_tokens_id_seq; Type: SEQUENCE; Schema: public; Owner: tis
--

CREATE SEQUENCE public.personal_access_tokens_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.personal_access_tokens_id_seq OWNER TO tis;

--
-- Name: personal_access_tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tis
--

ALTER SEQUENCE public.personal_access_tokens_id_seq OWNED BY public.personal_access_tokens.id;


--
-- Name: planificaciones; Type: TABLE; Schema: public; Owner: tis
--

CREATE TABLE public.planificaciones (
    id bigint NOT NULL,
    titulo character varying(255) NOT NULL,
    fecha_inicio character varying(255) NOT NULL,
    fecha_fin character varying(255) NOT NULL,
    dia_revision character varying(255) NOT NULL,
    hora_revision character varying(255) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    id_proyecto_empresa bigint NOT NULL
);


ALTER TABLE public.planificaciones OWNER TO tis;

--
-- Name: planificaciones_id_seq; Type: SEQUENCE; Schema: public; Owner: tis
--

CREATE SEQUENCE public.planificaciones_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.planificaciones_id_seq OWNER TO tis;

--
-- Name: planificaciones_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tis
--

ALTER SEQUENCE public.planificaciones_id_seq OWNED BY public.planificaciones.id;


--
-- Name: planilla_seguimientos; Type: TABLE; Schema: public; Owner: tis
--

CREATE TABLE public.planilla_seguimientos (
    id bigint NOT NULL,
    titulo character varying(255) NOT NULL,
    fecha_revision date NOT NULL,
    hora_revision time(0) without time zone NOT NULL,
    concluido boolean DEFAULT false NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    id_proyecto_empresa bigint NOT NULL
);


ALTER TABLE public.planilla_seguimientos OWNER TO tis;

--
-- Name: planilla_seguimientos_id_seq; Type: SEQUENCE; Schema: public; Owner: tis
--

CREATE SEQUENCE public.planilla_seguimientos_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.planilla_seguimientos_id_seq OWNER TO tis;

--
-- Name: planilla_seguimientos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tis
--

ALTER SEQUENCE public.planilla_seguimientos_id_seq OWNED BY public.planilla_seguimientos.id;


--
-- Name: proyecto_empresas; Type: TABLE; Schema: public; Owner: tis
--

CREATE TABLE public.proyecto_empresas (
    id bigint NOT NULL,
    habilitado boolean NOT NULL,
    id_proyecto bigint NOT NULL,
    id_empresa bigint NOT NULL,
    id_estado_contrato bigint NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.proyecto_empresas OWNER TO tis;

--
-- Name: proyecto_empresas_id_seq; Type: SEQUENCE; Schema: public; Owner: tis
--

CREATE SEQUENCE public.proyecto_empresas_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.proyecto_empresas_id_seq OWNER TO tis;

--
-- Name: proyecto_empresas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tis
--

ALTER SEQUENCE public.proyecto_empresas_id_seq OWNED BY public.proyecto_empresas.id;


--
-- Name: proyectos; Type: TABLE; Schema: public; Owner: tis
--

CREATE TABLE public.proyectos (
    id bigint NOT NULL,
    nombre character varying(255) NOT NULL,
    descripcion character varying(255) NOT NULL,
    codigo character varying(255) NOT NULL,
    fecha_inicio date NOT NULL,
    fecha_cierre date NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    id_creado_por bigint NOT NULL
);


ALTER TABLE public.proyectos OWNER TO tis;

--
-- Name: proyectos_id_seq; Type: SEQUENCE; Schema: public; Owner: tis
--

CREATE SEQUENCE public.proyectos_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.proyectos_id_seq OWNER TO tis;

--
-- Name: proyectos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tis
--

ALTER SEQUENCE public.proyectos_id_seq OWNED BY public.proyectos.id;


--
-- Name: revision_planificacion; Type: TABLE; Schema: public; Owner: tis
--

CREATE TABLE public.revision_planificacion (
    id bigint NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    observacion text DEFAULT ''::text NOT NULL,
    planillas_creada boolean DEFAULT false NOT NULL,
    id_proyecto_empresa bigint NOT NULL,
    id_estado_planificacion bigint DEFAULT '2'::bigint NOT NULL
);


ALTER TABLE public.revision_planificacion OWNER TO tis;

--
-- Name: revision_planificacion_id_seq; Type: SEQUENCE; Schema: public; Owner: tis
--

CREATE SEQUENCE public.revision_planificacion_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.revision_planificacion_id_seq OWNER TO tis;

--
-- Name: revision_planificacion_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tis
--

ALTER SEQUENCE public.revision_planificacion_id_seq OWNED BY public.revision_planificacion.id;


--
-- Name: rols; Type: TABLE; Schema: public; Owner: tis
--

CREATE TABLE public.rols (
    id bigint NOT NULL,
    nombre character varying(255) NOT NULL,
    descripcion character varying(255) NOT NULL
);


ALTER TABLE public.rols OWNER TO tis;

--
-- Name: rols_id_seq; Type: SEQUENCE; Schema: public; Owner: tis
--

CREATE SEQUENCE public.rols_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.rols_id_seq OWNER TO tis;

--
-- Name: rols_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tis
--

ALTER SEQUENCE public.rols_id_seq OWNED BY public.rols.id;


--
-- Name: socio_empresas; Type: TABLE; Schema: public; Owner: tis
--

CREATE TABLE public.socio_empresas (
    id bigint NOT NULL,
    id_empresa bigint NOT NULL,
    id_usuario bigint NOT NULL,
    activo boolean DEFAULT true NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.socio_empresas OWNER TO tis;

--
-- Name: socio_empresas_id_seq; Type: SEQUENCE; Schema: public; Owner: tis
--

CREATE SEQUENCE public.socio_empresas_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.socio_empresas_id_seq OWNER TO tis;

--
-- Name: socio_empresas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tis
--

ALTER SEQUENCE public.socio_empresas_id_seq OWNED BY public.socio_empresas.id;


--
-- Name: tareas; Type: TABLE; Schema: public; Owner: tis
--

CREATE TABLE public.tareas (
    id bigint NOT NULL,
    titulo character varying(255) NOT NULL,
    generada boolean DEFAULT false NOT NULL,
    observacion character varying(255) DEFAULT ''::character varying NOT NULL,
    nota integer DEFAULT 0 NOT NULL,
    id_evaluacion bigint NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.tareas OWNER TO tis;

--
-- Name: tareas_id_seq; Type: SEQUENCE; Schema: public; Owner: tis
--

CREATE SEQUENCE public.tareas_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tareas_id_seq OWNER TO tis;

--
-- Name: tareas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tis
--

ALTER SEQUENCE public.tareas_id_seq OWNED BY public.tareas.id;


--
-- Name: tipo_evaluacions; Type: TABLE; Schema: public; Owner: tis
--

CREATE TABLE public.tipo_evaluacions (
    id bigint NOT NULL,
    nombre character varying(255) NOT NULL,
    descripcion character varying(255) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.tipo_evaluacions OWNER TO tis;

--
-- Name: tipo_evaluacions_id_seq; Type: SEQUENCE; Schema: public; Owner: tis
--

CREATE SEQUENCE public.tipo_evaluacions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tipo_evaluacions_id_seq OWNER TO tis;

--
-- Name: tipo_evaluacions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tis
--

ALTER SEQUENCE public.tipo_evaluacions_id_seq OWNED BY public.tipo_evaluacions.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: tis
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    email_verified_at timestamp(0) without time zone,
    password character varying(255) NOT NULL,
    remember_token character varying(100),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.users OWNER TO tis;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: tis
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO tis;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tis
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: usuarios; Type: TABLE; Schema: public; Owner: tis
--

CREATE TABLE public.usuarios (
    id bigint NOT NULL,
    nombre character varying(255) NOT NULL,
    apellido character varying(255) NOT NULL,
    codigo_sis character varying(255) NOT NULL,
    correo character varying(255) NOT NULL,
    telefono character varying(255) NOT NULL,
    contrasena character varying(255) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    id_rol bigint NOT NULL
);


ALTER TABLE public.usuarios OWNER TO tis;

--
-- Name: usuarios_id_seq; Type: SEQUENCE; Schema: public; Owner: tis
--

CREATE SEQUENCE public.usuarios_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuarios_id_seq OWNER TO tis;

--
-- Name: usuarios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tis
--

ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;


--
-- Name: asistencia_evaluacion id; Type: DEFAULT; Schema: public; Owner: tis
--

ALTER TABLE ONLY public.asistencia_evaluacion ALTER COLUMN id SET DEFAULT nextval('public.asistencia_evaluacion_id_seq'::regclass);


--
-- Name: asistencia_planilla_seguimiento id; Type: DEFAULT; Schema: public; Owner: tis
--

ALTER TABLE ONLY public.asistencia_planilla_seguimiento ALTER COLUMN id SET DEFAULT nextval('public.asistencia_planilla_seguimiento_id_seq'::regclass);


--
-- Name: categorias id; Type: DEFAULT; Schema: public; Owner: tis
--

ALTER TABLE ONLY public.categorias ALTER COLUMN id SET DEFAULT nextval('public.categorias_id_seq'::regclass);


--
-- Name: documento_empresas id; Type: DEFAULT; Schema: public; Owner: tis
--

ALTER TABLE ONLY public.documento_empresas ALTER COLUMN id SET DEFAULT nextval('public.documento_empresas_id_seq'::regclass);


--
-- Name: documento_proyectos id; Type: DEFAULT; Schema: public; Owner: tis
--

ALTER TABLE ONLY public.documento_proyectos ALTER COLUMN id SET DEFAULT nextval('public.documento_proyectos_id_seq'::regclass);


--
-- Name: empresas id; Type: DEFAULT; Schema: public; Owner: tis
--

ALTER TABLE ONLY public.empresas ALTER COLUMN id SET DEFAULT nextval('public.empresas_id_seq'::regclass);


--
-- Name: estado_contratos id; Type: DEFAULT; Schema: public; Owner: tis
--

ALTER TABLE ONLY public.estado_contratos ALTER COLUMN id SET DEFAULT nextval('public.estado_contratos_id_seq'::regclass);


--
-- Name: estado_planificacion id; Type: DEFAULT; Schema: public; Owner: tis
--

ALTER TABLE ONLY public.estado_planificacion ALTER COLUMN id SET DEFAULT nextval('public.estado_planificacion_id_seq'::regclass);


--
-- Name: evaluacions id; Type: DEFAULT; Schema: public; Owner: tis
--

ALTER TABLE ONLY public.evaluacions ALTER COLUMN id SET DEFAULT nextval('public.evaluacions_id_seq'::regclass);


--
-- Name: failed_jobs id; Type: DEFAULT; Schema: public; Owner: tis
--

ALTER TABLE ONLY public.failed_jobs ALTER COLUMN id SET DEFAULT nextval('public.failed_jobs_id_seq'::regclass);


--
-- Name: item_planificacion id; Type: DEFAULT; Schema: public; Owner: tis
--

ALTER TABLE ONLY public.item_planificacion ALTER COLUMN id SET DEFAULT nextval('public.item_planificacion_id_seq'::regclass);


--
-- Name: item_planillas id; Type: DEFAULT; Schema: public; Owner: tis
--

ALTER TABLE ONLY public.item_planillas ALTER COLUMN id SET DEFAULT nextval('public.item_planillas_id_seq'::regclass);


--
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: tis
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- Name: personal_access_tokens id; Type: DEFAULT; Schema: public; Owner: tis
--

ALTER TABLE ONLY public.personal_access_tokens ALTER COLUMN id SET DEFAULT nextval('public.personal_access_tokens_id_seq'::regclass);


--
-- Name: planificaciones id; Type: DEFAULT; Schema: public; Owner: tis
--

ALTER TABLE ONLY public.planificaciones ALTER COLUMN id SET DEFAULT nextval('public.planificaciones_id_seq'::regclass);


--
-- Name: planilla_seguimientos id; Type: DEFAULT; Schema: public; Owner: tis
--

ALTER TABLE ONLY public.planilla_seguimientos ALTER COLUMN id SET DEFAULT nextval('public.planilla_seguimientos_id_seq'::regclass);


--
-- Name: proyecto_empresas id; Type: DEFAULT; Schema: public; Owner: tis
--

ALTER TABLE ONLY public.proyecto_empresas ALTER COLUMN id SET DEFAULT nextval('public.proyecto_empresas_id_seq'::regclass);


--
-- Name: proyectos id; Type: DEFAULT; Schema: public; Owner: tis
--

ALTER TABLE ONLY public.proyectos ALTER COLUMN id SET DEFAULT nextval('public.proyectos_id_seq'::regclass);


--
-- Name: revision_planificacion id; Type: DEFAULT; Schema: public; Owner: tis
--

ALTER TABLE ONLY public.revision_planificacion ALTER COLUMN id SET DEFAULT nextval('public.revision_planificacion_id_seq'::regclass);


--
-- Name: rols id; Type: DEFAULT; Schema: public; Owner: tis
--

ALTER TABLE ONLY public.rols ALTER COLUMN id SET DEFAULT nextval('public.rols_id_seq'::regclass);


--
-- Name: socio_empresas id; Type: DEFAULT; Schema: public; Owner: tis
--

ALTER TABLE ONLY public.socio_empresas ALTER COLUMN id SET DEFAULT nextval('public.socio_empresas_id_seq'::regclass);


--
-- Name: tareas id; Type: DEFAULT; Schema: public; Owner: tis
--

ALTER TABLE ONLY public.tareas ALTER COLUMN id SET DEFAULT nextval('public.tareas_id_seq'::regclass);


--
-- Name: tipo_evaluacions id; Type: DEFAULT; Schema: public; Owner: tis
--

ALTER TABLE ONLY public.tipo_evaluacions ALTER COLUMN id SET DEFAULT nextval('public.tipo_evaluacions_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: tis
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: usuarios id; Type: DEFAULT; Schema: public; Owner: tis
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);


--
-- Data for Name: asistencia_evaluacion; Type: TABLE DATA; Schema: public; Owner: tis
--

COPY public.asistencia_evaluacion (id, presente, created_at, updated_at, observacion, id_evaluacion, id_usuario) FROM stdin;
\.


--
-- Data for Name: asistencia_planilla_seguimiento; Type: TABLE DATA; Schema: public; Owner: tis
--

COPY public.asistencia_planilla_seguimiento (id, presente, created_at, updated_at, observacion, id_planilla_seguimiento, id_usuario) FROM stdin;
\.


--
-- Data for Name: categorias; Type: TABLE DATA; Schema: public; Owner: tis
--

COPY public.categorias (id, nombre, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: documento_empresas; Type: TABLE DATA; Schema: public; Owner: tis
--

COPY public.documento_empresas (id, titulo, url_ubicacion, created_at, updated_at, id_empresa) FROM stdin;
\.


--
-- Data for Name: documento_proyectos; Type: TABLE DATA; Schema: public; Owner: tis
--

COPY public.documento_proyectos (id, titulo, url_ubicacion, id_proyecto, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: empresas; Type: TABLE DATA; Schema: public; Owner: tis
--

COPY public.empresas (id, nombre_corto, nombre_largo, telefono, correo, url_logo, id_representante_legal, created_at, updated_at) FROM stdin;
1	techoSol	tecnologia de soluciones	4321542	email1@gmail.com	url/uno	1	\N	\N
2	IssaSoft	Inovacion software soluciones agiles de software	43091542	e12il1@gmail.com	url/dos	9	\N	\N
3	RobotSoft	robot de inteligencia software	43491542	roboy@gmail.com	url/tres	3	\N	\N
4	HeyMoney	Hey Soluciones simples para ganar Money	43491543	HeyMoneymail.com	url/cuatro	10	\N	\N
\.


--
-- Data for Name: estado_contratos; Type: TABLE DATA; Schema: public; Owner: tis
--

COPY public.estado_contratos (id, nombre, descripcion, created_at, updated_at) FROM stdin;
1	activo	este estado se produce cuando sigue activo	\N	\N
2	pendiente	este estado se produce cuando no se termina el proyecto	\N	\N
\.


--
-- Data for Name: estado_planificacion; Type: TABLE DATA; Schema: public; Owner: tis
--

COPY public.estado_planificacion (id, created_at, updated_at, estado, descripcion) FROM stdin;
1	\N	\N	no existe	la planificacion no existe
2	\N	\N	en revision	la planificacion esta en revision
3	\N	\N	aceptado	la planificacion fue aceptado
4	\N	\N	rechazado	la planificacion fue rechazada
\.


--
-- Data for Name: evaluacions; Type: TABLE DATA; Schema: public; Owner: tis
--

COPY public.evaluacions (id, titulo, fecha_revision, hora_revision, concluido, nota, id_proyecto_empresa, id_tipo_evaluacion, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: failed_jobs; Type: TABLE DATA; Schema: public; Owner: tis
--

COPY public.failed_jobs (id, uuid, connection, queue, payload, exception, failed_at) FROM stdin;
\.


--
-- Data for Name: item_planificacion; Type: TABLE DATA; Schema: public; Owner: tis
--

COPY public.item_planificacion (id, nombre, created_at, updated_at, id_planificacion) FROM stdin;
1	product backlog sprint	\N	\N	1
2	product backlog sprint con carry over	\N	\N	2
3	Correcion del product backlog	\N	\N	3
4	historias de usuario del sprint	\N	\N	1
5	historias de usuario mejoradas para el sprint	\N	\N	2
6	mejora de las historias del sprint3	\N	\N	3
7	mockups de las interfaces	\N	\N	1
8	mejora a las mockups	\N	\N	2
9	mockups del sprint3	\N	\N	3
10	Manual de usuario	\N	\N	3
11	Manual de instalacion	\N	\N	3
12	poblar la base de datos	\N	\N	4
13	la creacion de proyecyos	\N	\N	4
14	creacion de modelos en la base de datos	\N	\N	4
15	crear diseno de base de datos	\N	\N	5
16	diseños de ux implementado	\N	\N	5
17	creacion endpoint backend	\N	\N	5
\.


--
-- Data for Name: item_planillas; Type: TABLE DATA; Schema: public; Owner: tis
--

COPY public.item_planillas (id, titulo, generada, observacion, id_planilla_seguimiento, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: tis
--

COPY public.migrations (id, migration, batch) FROM stdin;
1	2014_10_12_000000_create_users_table	1
2	2014_10_12_100000_create_password_resets_table	1
3	2019_08_19_000000_create_failed_jobs_table	1
4	2019_12_14_000001_create_personal_access_tokens_table	1
5	2024_09_27_220853_create_rol_table	1
6	2024_09_27_220854_create_usuario_table	1
7	2024_09_27_220855_create_empresa_table	1
8	2024_09_27_220856_create_socio_empresa_table	1
9	2024_09_27_221259_create_proyecto_table	1
10	2024_09_27_222229_create_documento_proyecto_table	1
11	2024_09_27_222706_create_documento_empresa_table	1
12	2024_09_27_224025_create_tipo_evaluacion_table	1
13	2024_09_27_224308_create_estado_contrato_table	1
14	2024_09_27_224322_create_proyecto_empresa_table	1
15	2024_09_27_224430_create_evaluacion_table	1
16	2024_09_27_224438_create_tarea_table	1
17	2024_09_27_224939_create_categoria_table	1
18	2024_09_27_225324_create_planilla_seguimiento_table	1
19	2024_09_27_225930_create_item_planilla_table	1
20	2024_10_01_210010_create_item_planificacion_table	1
21	2024_10_23_032051_create_asistencia_planilla_segimiento_table	1
22	2024_10_23_032110_create_asistencia_evaluacion_table	1
23	2024_11_03_032808_create_estado_planificacion_table	1
24	2024_11_03_032837_create_revision_planificacion_table	1
25	2024_11_04_205355_create_planificacion_table	1
\.


--
-- Data for Name: password_resets; Type: TABLE DATA; Schema: public; Owner: tis
--

COPY public.password_resets (email, token, created_at) FROM stdin;
\.


--
-- Data for Name: personal_access_tokens; Type: TABLE DATA; Schema: public; Owner: tis
--

COPY public.personal_access_tokens (id, tokenable_type, tokenable_id, name, token, abilities, last_used_at, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: planificaciones; Type: TABLE DATA; Schema: public; Owner: tis
--

COPY public.planificaciones (id, titulo, fecha_inicio, fecha_fin, dia_revision, hora_revision, created_at, updated_at, id_proyecto_empresa) FROM stdin;
1	sprint 1	2024/9/8	2024/9/28	2	8:15	\N	\N	2
2	sprint 2	2024/9/29	2024/11/20	2	8:15	\N	\N	2
3	sprint 3	2024/11/21	2024/12/8	2	8:15	\N	\N	2
4	sprint 1	2024/11/10	2024/11/19	2	8:15	\N	\N	3
5	sprint 2	2024/11/20	2024/12/10	2	8:15	\N	\N	3
6	sprint 3	2024/12/10	2024/12/30	2	8:15	\N	\N	3
\.


--
-- Data for Name: planilla_seguimientos; Type: TABLE DATA; Schema: public; Owner: tis
--

COPY public.planilla_seguimientos (id, titulo, fecha_revision, hora_revision, concluido, created_at, updated_at, id_proyecto_empresa) FROM stdin;
\.


--
-- Data for Name: proyecto_empresas; Type: TABLE DATA; Schema: public; Owner: tis
--

COPY public.proyecto_empresas (id, habilitado, id_proyecto, id_empresa, id_estado_contrato, created_at, updated_at) FROM stdin;
1	t	1	1	1	\N	\N
2	t	1	2	1	\N	\N
3	t	1	3	1	\N	\N
4	t	1	4	1	\N	\N
\.


--
-- Data for Name: proyectos; Type: TABLE DATA; Schema: public; Owner: tis
--

COPY public.proyectos (id, nombre, descripcion, codigo, fecha_inicio, fecha_cierre, created_at, updated_at, id_creado_por) FROM stdin;
1	proyecto de creacion de ambientes	este proyecto consiste en crear una ambientes con sus estudiantes	PCA-01	2024-10-10	2024-12-20	\N	\N	1
\.


--
-- Data for Name: revision_planificacion; Type: TABLE DATA; Schema: public; Owner: tis
--

COPY public.revision_planificacion (id, created_at, updated_at, observacion, planillas_creada, id_proyecto_empresa, id_estado_planificacion) FROM stdin;
1	\N	\N		f	1	1
2	\N	\N		f	2	3
3	\N	\N		f	3	4
4	\N	\N		f	4	1
\.


--
-- Data for Name: rols; Type: TABLE DATA; Schema: public; Owner: tis
--

COPY public.rols (id, nombre, descripcion) FROM stdin;
1	docente	persona que se encarga de Tis
2	usuario	persona comun
3	administrador	persona que se encarga de administrar
\.


--
-- Data for Name: socio_empresas; Type: TABLE DATA; Schema: public; Owner: tis
--

COPY public.socio_empresas (id, id_empresa, id_usuario, activo, created_at, updated_at) FROM stdin;
1	1	2	t	\N	\N
2	2	5	t	\N	\N
3	2	6	t	\N	\N
4	2	7	t	\N	\N
5	2	8	t	\N	\N
6	2	9	t	\N	\N
7	1	3	t	\N	\N
8	1	4	t	\N	\N
9	4	10	t	\N	\N
10	4	11	t	\N	\N
11	4	12	t	\N	\N
12	3	14	t	\N	\N
13	3	15	t	\N	\N
\.


--
-- Data for Name: tareas; Type: TABLE DATA; Schema: public; Owner: tis
--

COPY public.tareas (id, titulo, generada, observacion, nota, id_evaluacion, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: tipo_evaluacions; Type: TABLE DATA; Schema: public; Owner: tis
--

COPY public.tipo_evaluacions (id, nombre, descripcion, created_at, updated_at) FROM stdin;
1	presencial	en la presencia de cara cara	\N	\N
2	mixta	se cambia los entre estudiantes de distintos grupos TIS	\N	\N
3	pares	se cambia entre los pares	\N	\N
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: tis
--

COPY public.users (id, name, email, email_verified_at, password, remember_token, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: tis
--

COPY public.usuarios (id, nombre, apellido, codigo_sis, correo, telefono, contrasena, created_at, updated_at, id_rol) FROM stdin;
1	mateo	corina	800252789	emaila32@gmail.com	4320972	passwords11	\N	\N	1
2	carla	millanes	124146429	email12@gmail.com	4567542	passwords21	\N	\N	2
3	marcos	valencia	124096429	email15@gmail.com	4561592	passwords21	\N	\N	2
4	marcos	millanes	414146429	e123ail12@gmail.com	4589542	passwords211	\N	\N	2
5	mariaa	jaldines	124146899	passl12@gmail.com	4519542	password212	\N	\N	2
6	ariel	valencia	124146001	valencia@gmail.com	4000001	password212	\N	\N	2
7	ever	coca	124146002	coca@gmail.com	4000002	password212	\N	\N	2
8	erlinda	lopez	124146003	lopez@gmail.com	4000003	password212	\N	\N	2
9	jose	castro	124146004	castro@gmail.com	4000004	password212	\N	\N	2
10	samuel	navia	124146005	navia@gmail.com	4000005	password212	\N	\N	2
11	usuario1	fantasma	124146008	fantasma1@gmail.com	42709001	fantasma272	\N	\N	2
12	usuario2	fantasma	124146006	fantasma2@gmail.com	42709003	fantasma273	\N	\N	2
13	usuario3	fantasma	124146007	fantasma3@gmail.com	42709003	fantasma273	\N	\N	2
14	usuario4	fantasma	124146010	fantasma4@gmail.com	42709004	fantasma274	\N	\N	2
15	usuario5	fantasma	124146009	fantasma5@gmail.com	42709005	fantasma275	\N	\N	2
16	juan	marcos	123456789	email1@gmail.com	4321542	passwords1	\N	\N	1
17	carlos	illanes	123746789	email2@gmail.com	4085542	passwords2	\N	\N	1
18	marcelo	perez	962746789	otroemail2@gmail.com	0931263	passwords3	\N	\N	1
19	prueba	registro empresa	96274789	oososoad2@gmail.com	6304567	password12	\N	\N	2
20	prueba2	empresa	96674789	oolosdasad2@gmail.com	63042673	passworl12	\N	\N	2
\.


--
-- Name: asistencia_evaluacion_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tis
--

SELECT pg_catalog.setval('public.asistencia_evaluacion_id_seq', 1, false);


--
-- Name: asistencia_planilla_seguimiento_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tis
--

SELECT pg_catalog.setval('public.asistencia_planilla_seguimiento_id_seq', 1, false);


--
-- Name: categorias_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tis
--

SELECT pg_catalog.setval('public.categorias_id_seq', 1, false);


--
-- Name: documento_empresas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tis
--

SELECT pg_catalog.setval('public.documento_empresas_id_seq', 1, false);


--
-- Name: documento_proyectos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tis
--

SELECT pg_catalog.setval('public.documento_proyectos_id_seq', 1, false);


--
-- Name: empresas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tis
--

SELECT pg_catalog.setval('public.empresas_id_seq', 4, true);


--
-- Name: estado_contratos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tis
--

SELECT pg_catalog.setval('public.estado_contratos_id_seq', 2, true);


--
-- Name: estado_planificacion_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tis
--

SELECT pg_catalog.setval('public.estado_planificacion_id_seq', 4, true);


--
-- Name: evaluacions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tis
--

SELECT pg_catalog.setval('public.evaluacions_id_seq', 1, false);


--
-- Name: failed_jobs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tis
--

SELECT pg_catalog.setval('public.failed_jobs_id_seq', 1, false);


--
-- Name: item_planificacion_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tis
--

SELECT pg_catalog.setval('public.item_planificacion_id_seq', 17, true);


--
-- Name: item_planillas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tis
--

SELECT pg_catalog.setval('public.item_planillas_id_seq', 1, false);


--
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tis
--

SELECT pg_catalog.setval('public.migrations_id_seq', 25, true);


--
-- Name: personal_access_tokens_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tis
--

SELECT pg_catalog.setval('public.personal_access_tokens_id_seq', 1, false);


--
-- Name: planificaciones_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tis
--

SELECT pg_catalog.setval('public.planificaciones_id_seq', 6, true);


--
-- Name: planilla_seguimientos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tis
--

SELECT pg_catalog.setval('public.planilla_seguimientos_id_seq', 1, false);


--
-- Name: proyecto_empresas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tis
--

SELECT pg_catalog.setval('public.proyecto_empresas_id_seq', 4, true);


--
-- Name: proyectos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tis
--

SELECT pg_catalog.setval('public.proyectos_id_seq', 1, true);


--
-- Name: revision_planificacion_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tis
--

SELECT pg_catalog.setval('public.revision_planificacion_id_seq', 4, true);


--
-- Name: rols_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tis
--

SELECT pg_catalog.setval('public.rols_id_seq', 3, true);


--
-- Name: socio_empresas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tis
--

SELECT pg_catalog.setval('public.socio_empresas_id_seq', 13, true);


--
-- Name: tareas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tis
--

SELECT pg_catalog.setval('public.tareas_id_seq', 1, false);


--
-- Name: tipo_evaluacions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tis
--

SELECT pg_catalog.setval('public.tipo_evaluacions_id_seq', 3, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tis
--

SELECT pg_catalog.setval('public.users_id_seq', 1, false);


--
-- Name: usuarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tis
--

SELECT pg_catalog.setval('public.usuarios_id_seq', 20, true);


--
-- Name: asistencia_evaluacion asistencia_evaluacion_pkey; Type: CONSTRAINT; Schema: public; Owner: tis
--

ALTER TABLE ONLY public.asistencia_evaluacion
    ADD CONSTRAINT asistencia_evaluacion_pkey PRIMARY KEY (id);


--
-- Name: asistencia_planilla_seguimiento asistencia_planilla_seguimiento_pkey; Type: CONSTRAINT; Schema: public; Owner: tis
--

ALTER TABLE ONLY public.asistencia_planilla_seguimiento
    ADD CONSTRAINT asistencia_planilla_seguimiento_pkey PRIMARY KEY (id);


--
-- Name: categorias categorias_pkey; Type: CONSTRAINT; Schema: public; Owner: tis
--

ALTER TABLE ONLY public.categorias
    ADD CONSTRAINT categorias_pkey PRIMARY KEY (id);


--
-- Name: documento_empresas documento_empresas_pkey; Type: CONSTRAINT; Schema: public; Owner: tis
--

ALTER TABLE ONLY public.documento_empresas
    ADD CONSTRAINT documento_empresas_pkey PRIMARY KEY (id);


--
-- Name: documento_proyectos documento_proyectos_pkey; Type: CONSTRAINT; Schema: public; Owner: tis
--

ALTER TABLE ONLY public.documento_proyectos
    ADD CONSTRAINT documento_proyectos_pkey PRIMARY KEY (id);


--
-- Name: empresas empresas_nombre_corto_unique; Type: CONSTRAINT; Schema: public; Owner: tis
--

ALTER TABLE ONLY public.empresas
    ADD CONSTRAINT empresas_nombre_corto_unique UNIQUE (nombre_corto);


--
-- Name: empresas empresas_nombre_largo_unique; Type: CONSTRAINT; Schema: public; Owner: tis
--

ALTER TABLE ONLY public.empresas
    ADD CONSTRAINT empresas_nombre_largo_unique UNIQUE (nombre_largo);


--
-- Name: empresas empresas_pkey; Type: CONSTRAINT; Schema: public; Owner: tis
--

ALTER TABLE ONLY public.empresas
    ADD CONSTRAINT empresas_pkey PRIMARY KEY (id);


--
-- Name: estado_contratos estado_contratos_pkey; Type: CONSTRAINT; Schema: public; Owner: tis
--

ALTER TABLE ONLY public.estado_contratos
    ADD CONSTRAINT estado_contratos_pkey PRIMARY KEY (id);


--
-- Name: estado_planificacion estado_planificacion_pkey; Type: CONSTRAINT; Schema: public; Owner: tis
--

ALTER TABLE ONLY public.estado_planificacion
    ADD CONSTRAINT estado_planificacion_pkey PRIMARY KEY (id);


--
-- Name: evaluacions evaluacions_pkey; Type: CONSTRAINT; Schema: public; Owner: tis
--

ALTER TABLE ONLY public.evaluacions
    ADD CONSTRAINT evaluacions_pkey PRIMARY KEY (id);


--
-- Name: failed_jobs failed_jobs_pkey; Type: CONSTRAINT; Schema: public; Owner: tis
--

ALTER TABLE ONLY public.failed_jobs
    ADD CONSTRAINT failed_jobs_pkey PRIMARY KEY (id);


--
-- Name: failed_jobs failed_jobs_uuid_unique; Type: CONSTRAINT; Schema: public; Owner: tis
--

ALTER TABLE ONLY public.failed_jobs
    ADD CONSTRAINT failed_jobs_uuid_unique UNIQUE (uuid);


--
-- Name: item_planificacion item_planificacion_pkey; Type: CONSTRAINT; Schema: public; Owner: tis
--

ALTER TABLE ONLY public.item_planificacion
    ADD CONSTRAINT item_planificacion_pkey PRIMARY KEY (id);


--
-- Name: item_planillas item_planillas_pkey; Type: CONSTRAINT; Schema: public; Owner: tis
--

ALTER TABLE ONLY public.item_planillas
    ADD CONSTRAINT item_planillas_pkey PRIMARY KEY (id);


--
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: tis
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);


--
-- Name: personal_access_tokens personal_access_tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: tis
--

ALTER TABLE ONLY public.personal_access_tokens
    ADD CONSTRAINT personal_access_tokens_pkey PRIMARY KEY (id);


--
-- Name: personal_access_tokens personal_access_tokens_token_unique; Type: CONSTRAINT; Schema: public; Owner: tis
--

ALTER TABLE ONLY public.personal_access_tokens
    ADD CONSTRAINT personal_access_tokens_token_unique UNIQUE (token);


--
-- Name: planificaciones planificaciones_pkey; Type: CONSTRAINT; Schema: public; Owner: tis
--

ALTER TABLE ONLY public.planificaciones
    ADD CONSTRAINT planificaciones_pkey PRIMARY KEY (id);


--
-- Name: planilla_seguimientos planilla_seguimientos_pkey; Type: CONSTRAINT; Schema: public; Owner: tis
--

ALTER TABLE ONLY public.planilla_seguimientos
    ADD CONSTRAINT planilla_seguimientos_pkey PRIMARY KEY (id);


--
-- Name: proyecto_empresas proyecto_empresas_pkey; Type: CONSTRAINT; Schema: public; Owner: tis
--

ALTER TABLE ONLY public.proyecto_empresas
    ADD CONSTRAINT proyecto_empresas_pkey PRIMARY KEY (id);


--
-- Name: proyectos proyectos_pkey; Type: CONSTRAINT; Schema: public; Owner: tis
--

ALTER TABLE ONLY public.proyectos
    ADD CONSTRAINT proyectos_pkey PRIMARY KEY (id);


--
-- Name: revision_planificacion revision_planificacion_pkey; Type: CONSTRAINT; Schema: public; Owner: tis
--

ALTER TABLE ONLY public.revision_planificacion
    ADD CONSTRAINT revision_planificacion_pkey PRIMARY KEY (id);


--
-- Name: rols rols_pkey; Type: CONSTRAINT; Schema: public; Owner: tis
--

ALTER TABLE ONLY public.rols
    ADD CONSTRAINT rols_pkey PRIMARY KEY (id);


--
-- Name: socio_empresas socio_empresas_pkey; Type: CONSTRAINT; Schema: public; Owner: tis
--

ALTER TABLE ONLY public.socio_empresas
    ADD CONSTRAINT socio_empresas_pkey PRIMARY KEY (id);


--
-- Name: tareas tareas_pkey; Type: CONSTRAINT; Schema: public; Owner: tis
--

ALTER TABLE ONLY public.tareas
    ADD CONSTRAINT tareas_pkey PRIMARY KEY (id);


--
-- Name: tipo_evaluacions tipo_evaluacions_pkey; Type: CONSTRAINT; Schema: public; Owner: tis
--

ALTER TABLE ONLY public.tipo_evaluacions
    ADD CONSTRAINT tipo_evaluacions_pkey PRIMARY KEY (id);


--
-- Name: users users_email_unique; Type: CONSTRAINT; Schema: public; Owner: tis
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_unique UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: tis
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: usuarios usuarios_codigo_sis_unique; Type: CONSTRAINT; Schema: public; Owner: tis
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_codigo_sis_unique UNIQUE (codigo_sis);


--
-- Name: usuarios usuarios_correo_unique; Type: CONSTRAINT; Schema: public; Owner: tis
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_correo_unique UNIQUE (correo);


--
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: tis
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);


--
-- Name: password_resets_email_index; Type: INDEX; Schema: public; Owner: tis
--

CREATE INDEX password_resets_email_index ON public.password_resets USING btree (email);


--
-- Name: personal_access_tokens_tokenable_type_tokenable_id_index; Type: INDEX; Schema: public; Owner: tis
--

CREATE INDEX personal_access_tokens_tokenable_type_tokenable_id_index ON public.personal_access_tokens USING btree (tokenable_type, tokenable_id);


--
-- Name: asistencia_evaluacion asistencia_evaluacion_id_evaluacion_foreign; Type: FK CONSTRAINT; Schema: public; Owner: tis
--

ALTER TABLE ONLY public.asistencia_evaluacion
    ADD CONSTRAINT asistencia_evaluacion_id_evaluacion_foreign FOREIGN KEY (id_evaluacion) REFERENCES public.evaluacions(id) ON DELETE CASCADE;


--
-- Name: asistencia_evaluacion asistencia_evaluacion_id_usuario_foreign; Type: FK CONSTRAINT; Schema: public; Owner: tis
--

ALTER TABLE ONLY public.asistencia_evaluacion
    ADD CONSTRAINT asistencia_evaluacion_id_usuario_foreign FOREIGN KEY (id_usuario) REFERENCES public.usuarios(id) ON DELETE CASCADE;


--
-- Name: asistencia_planilla_seguimiento asistencia_planilla_seguimiento_id_planilla_seguimiento_foreign; Type: FK CONSTRAINT; Schema: public; Owner: tis
--

ALTER TABLE ONLY public.asistencia_planilla_seguimiento
    ADD CONSTRAINT asistencia_planilla_seguimiento_id_planilla_seguimiento_foreign FOREIGN KEY (id_planilla_seguimiento) REFERENCES public.planilla_seguimientos(id) ON DELETE CASCADE;


--
-- Name: asistencia_planilla_seguimiento asistencia_planilla_seguimiento_id_usuario_foreign; Type: FK CONSTRAINT; Schema: public; Owner: tis
--

ALTER TABLE ONLY public.asistencia_planilla_seguimiento
    ADD CONSTRAINT asistencia_planilla_seguimiento_id_usuario_foreign FOREIGN KEY (id_usuario) REFERENCES public.usuarios(id) ON DELETE CASCADE;


--
-- Name: documento_empresas documento_empresas_id_empresa_foreign; Type: FK CONSTRAINT; Schema: public; Owner: tis
--

ALTER TABLE ONLY public.documento_empresas
    ADD CONSTRAINT documento_empresas_id_empresa_foreign FOREIGN KEY (id_empresa) REFERENCES public.empresas(id) ON DELETE CASCADE;


--
-- Name: documento_proyectos documento_proyectos_id_proyecto_foreign; Type: FK CONSTRAINT; Schema: public; Owner: tis
--

ALTER TABLE ONLY public.documento_proyectos
    ADD CONSTRAINT documento_proyectos_id_proyecto_foreign FOREIGN KEY (id_proyecto) REFERENCES public.proyectos(id) ON DELETE CASCADE;


--
-- Name: empresas empresas_id_representante_legal_foreign; Type: FK CONSTRAINT; Schema: public; Owner: tis
--

ALTER TABLE ONLY public.empresas
    ADD CONSTRAINT empresas_id_representante_legal_foreign FOREIGN KEY (id_representante_legal) REFERENCES public.usuarios(id) ON DELETE CASCADE;


--
-- Name: evaluacions evaluacions_id_proyecto_empresa_foreign; Type: FK CONSTRAINT; Schema: public; Owner: tis
--

ALTER TABLE ONLY public.evaluacions
    ADD CONSTRAINT evaluacions_id_proyecto_empresa_foreign FOREIGN KEY (id_proyecto_empresa) REFERENCES public.proyecto_empresas(id);


--
-- Name: evaluacions evaluacions_id_tipo_evaluacion_foreign; Type: FK CONSTRAINT; Schema: public; Owner: tis
--

ALTER TABLE ONLY public.evaluacions
    ADD CONSTRAINT evaluacions_id_tipo_evaluacion_foreign FOREIGN KEY (id_tipo_evaluacion) REFERENCES public.tipo_evaluacions(id);


--
-- Name: item_planillas item_planillas_id_planilla_seguimiento_foreign; Type: FK CONSTRAINT; Schema: public; Owner: tis
--

ALTER TABLE ONLY public.item_planillas
    ADD CONSTRAINT item_planillas_id_planilla_seguimiento_foreign FOREIGN KEY (id_planilla_seguimiento) REFERENCES public.planilla_seguimientos(id) ON DELETE CASCADE;


--
-- Name: planificaciones planificaciones_id_proyecto_empresa_foreign; Type: FK CONSTRAINT; Schema: public; Owner: tis
--

ALTER TABLE ONLY public.planificaciones
    ADD CONSTRAINT planificaciones_id_proyecto_empresa_foreign FOREIGN KEY (id_proyecto_empresa) REFERENCES public.proyecto_empresas(id) ON DELETE CASCADE;


--
-- Name: planilla_seguimientos planilla_seguimientos_id_proyecto_empresa_foreign; Type: FK CONSTRAINT; Schema: public; Owner: tis
--

ALTER TABLE ONLY public.planilla_seguimientos
    ADD CONSTRAINT planilla_seguimientos_id_proyecto_empresa_foreign FOREIGN KEY (id_proyecto_empresa) REFERENCES public.proyecto_empresas(id) ON DELETE CASCADE;


--
-- Name: proyecto_empresas proyecto_empresas_id_empresa_foreign; Type: FK CONSTRAINT; Schema: public; Owner: tis
--

ALTER TABLE ONLY public.proyecto_empresas
    ADD CONSTRAINT proyecto_empresas_id_empresa_foreign FOREIGN KEY (id_empresa) REFERENCES public.empresas(id) ON DELETE CASCADE;


--
-- Name: proyecto_empresas proyecto_empresas_id_estado_contrato_foreign; Type: FK CONSTRAINT; Schema: public; Owner: tis
--

ALTER TABLE ONLY public.proyecto_empresas
    ADD CONSTRAINT proyecto_empresas_id_estado_contrato_foreign FOREIGN KEY (id_estado_contrato) REFERENCES public.estado_contratos(id) ON DELETE CASCADE;


--
-- Name: proyecto_empresas proyecto_empresas_id_proyecto_foreign; Type: FK CONSTRAINT; Schema: public; Owner: tis
--

ALTER TABLE ONLY public.proyecto_empresas
    ADD CONSTRAINT proyecto_empresas_id_proyecto_foreign FOREIGN KEY (id_proyecto) REFERENCES public.proyectos(id) ON DELETE CASCADE;


--
-- Name: proyectos proyectos_id_creado_por_foreign; Type: FK CONSTRAINT; Schema: public; Owner: tis
--

ALTER TABLE ONLY public.proyectos
    ADD CONSTRAINT proyectos_id_creado_por_foreign FOREIGN KEY (id_creado_por) REFERENCES public.usuarios(id) ON DELETE CASCADE;


--
-- Name: revision_planificacion revision_planificacion_id_estado_planificacion_foreign; Type: FK CONSTRAINT; Schema: public; Owner: tis
--

ALTER TABLE ONLY public.revision_planificacion
    ADD CONSTRAINT revision_planificacion_id_estado_planificacion_foreign FOREIGN KEY (id_estado_planificacion) REFERENCES public.estado_planificacion(id);


--
-- Name: revision_planificacion revision_planificacion_id_proyecto_empresa_foreign; Type: FK CONSTRAINT; Schema: public; Owner: tis
--

ALTER TABLE ONLY public.revision_planificacion
    ADD CONSTRAINT revision_planificacion_id_proyecto_empresa_foreign FOREIGN KEY (id_proyecto_empresa) REFERENCES public.proyecto_empresas(id) ON DELETE CASCADE;


--
-- Name: socio_empresas socio_empresas_id_empresa_foreign; Type: FK CONSTRAINT; Schema: public; Owner: tis
--

ALTER TABLE ONLY public.socio_empresas
    ADD CONSTRAINT socio_empresas_id_empresa_foreign FOREIGN KEY (id_empresa) REFERENCES public.empresas(id) ON DELETE CASCADE;


--
-- Name: socio_empresas socio_empresas_id_usuario_foreign; Type: FK CONSTRAINT; Schema: public; Owner: tis
--

ALTER TABLE ONLY public.socio_empresas
    ADD CONSTRAINT socio_empresas_id_usuario_foreign FOREIGN KEY (id_usuario) REFERENCES public.usuarios(id) ON DELETE CASCADE;


--
-- Name: tareas tareas_id_evaluacion_foreign; Type: FK CONSTRAINT; Schema: public; Owner: tis
--

ALTER TABLE ONLY public.tareas
    ADD CONSTRAINT tareas_id_evaluacion_foreign FOREIGN KEY (id_evaluacion) REFERENCES public.evaluacions(id) ON DELETE CASCADE;


--
-- Name: usuarios usuarios_id_rol_foreign; Type: FK CONSTRAINT; Schema: public; Owner: tis
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_id_rol_foreign FOREIGN KEY (id_rol) REFERENCES public.rols(id) ON DELETE CASCADE;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

