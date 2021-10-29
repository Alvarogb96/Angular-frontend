export interface Noticia {
    id_noticia: string;
    titulo: string;
    descripcion: string;
    fecha_creacion: string;
    fecha_actualizacion: string;
    oculto: string;
    id_sucursal: string;
}

export function NOTICIA_BLANK(): Noticia {
    const aux = {
        id_noticia: '',
        titulo: '',
        descripcion: '',
        fecha_creacion: null,
        fecha_actualizacion: null,
        oculto: null,
        id_sucursal: null
    };
    return Object.assign(aux);
}