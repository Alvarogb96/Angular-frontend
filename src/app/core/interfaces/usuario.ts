export interface UsuarioAlta {
    nombre: string;
    apellido1: string;
    apellido2: string;
    nif: string;
    fecha_nacimiento: string;
    fecha_creacion: string;
    email: string;
    password: string;
    role: string;
    id_sucursal: string;
    fecha_Actualizacion: string;
}

export interface UsuarioJornada {
    id_usuario: string;
    nombre: string;
    apellido1: string;
    apellido2: string;
    nif: string;
    fecha_nacimiento: string;
    fecha_creacion: string;
    email: string;
    role: string;
    id_sucursal: string;
    fecha_actualizacion: string;
    id_jornada: string;
    hora_inicio: string;
    hora_fin: string;
    horas_semanales: string;
}

export interface Usuario {
    id_usuario: string;
    nombre: string;
    apellido1: string;
    apellido2: string;
    nif: string;
    fecha_nacimiento: string;
    fecha_creacion: string;
    email: string;
    id_sucursal: string;
    fecha_Actualizacion: string;
    role: string;
}

export interface UsuarioFiltroSucursal{
    sucursal: string;
    empresa: string;
    idPropio: string;
}

export interface UsuarioCambioPassword{
    id_usuario: string;
    id_sucursal: string;
    password: string;
    newPassword: string;
    newPassword2: string;
    fecha_actualizacion: string;
}

export function USUARIO_FILTRO_SUCURSAL_BLANK(): UsuarioFiltroSucursal {
    const aux = {
        sucursal: null,
        empresa: null,
        idPropio: null
    };
    return Object.assign(aux);
}

export function USUARIO_ALTA_BLANK(): UsuarioAlta {
    const aux = {
        nombre: null,
        apellido1: null,
        apellido2: null,
        nif: null,
        fecha_nacimiento: null,
        fecha_creacion: null,
        email: null,
        password: null,
        role: null,
        id_sucursal: null,
        fecha_actualizacion: null

    };
    return Object.assign(aux);
}

export function USUARIO_BLANK(): Usuario {
    const aux = {
        id_usuario: null,
        nombre: null,
        apellido1: null,
        apellido2: null,
        nif: null,
        fecha_nacimiento: null,
        fecha_creacion: null,
        email: null,
        id_sucursal: null,
        fecha_actualizacion: null,
        role: null
    };
    return Object.assign(aux);
}

export function USUARIO_CAMBIO_PASSWORD_BLANK(): UsuarioCambioPassword {
    const aux = {
        id_usuario: null,
        id_sucursal: null,
        password: null,
        newPassword: null,
        newPassword2: null,
        fecha_actualizacion: null
    };
    return Object.assign(aux);
}

export function USUARIO_JORNADA_BLANK(): UsuarioJornada {
    const aux = {
        id_usuario: null,
        nombre: null,
        apellido1: null,
        apellido2: null,
        nif: null,
        fecha_nacimiento: null,
        fecha_creacion: null,
        email: null,
        password: null,
        role: null,
        id_sucursal: null,
        fecha_actualizacion: null,
        id_jornada: null,
        hora_inicio: null,
        hora_fin: null,
        horas_semanales: null
    };
    return Object.assign(aux);
}