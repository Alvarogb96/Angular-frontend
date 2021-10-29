export interface Sucursal {
    id_sucursal: string;
    id_empresa: string;
    nombre: string;
    nif: string;
    direccion: string;
    fecha_creacion: string;
    email: string;
    fecha_actualizacion: string;
}


export function SUCURSAL_BLANK(): Sucursal {
    const aux = {
        id_sucursal: null,
        id_empresa: null,
        nombre: null,
        nif: null,
        direccion: null,
        fecha_creacion: null,
        email: null,
        fecha_actualizacion: null,
    };
    return Object.assign(aux);
}