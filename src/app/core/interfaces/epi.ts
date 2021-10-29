export interface Epi{
    id_tipo: string;
    lote: string;
    cantidad: number;
    fecha_creacion: string;
    fecha_actualizacion: string;
    id_sucursal: string;
    existencias: number;
    fecha_disponibilidad: string;
}

export function EPI_BLANK(): Epi {
    const aux = {
        id_tipo: null,
        lote: null,
        cantidad: null,
        fecha_creacion: null,
        fecha_actualizacion: null,
        id_sucursal: null,
        existencias: null,
        fecha_disponibilidad: null
    };
    return Object.assign(aux);
}

export interface TipoEpi{
    id_tipo_epi: string;
    descripcion: string;
    image: string;
}

export function TIPO_EPI_BLANK(): TipoEpi {
    const aux = {
        id_tipo_epi: null,
        descripcion: null,
        image: null
    };
    return Object.assign(aux);
}