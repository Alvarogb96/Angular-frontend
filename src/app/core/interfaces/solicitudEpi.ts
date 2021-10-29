export interface SolicitudEpi {
    id_solicitud: string;
    id_empleado: string;
    id_directivo: string;
    fecha_creacion: string;
    fecha_aprobacion: string;
    aprobada: string;
    fecha_actualizacion: string;
}

export function SOLICITUD_EPI_BLANK(): SolicitudEpi {
    const aux = {
        id_solicitud: null,
        id_empleado: null,
        id_directivo: null,
        fecha_creacion: null,
        fecha_aprobacion: null,
        aprobada: null,
        fecha_actualizacion: null
    };
    return Object.assign(aux);
}

export interface Epi{
    id_tipo_epi: string;
    cantidad_material: number;
}

export function EPI_BLANK(): Epi {
    const aux = {
        id_tipo_epi: '',
        cantidad_material: null
    };
    return Object.assign(aux);
}

export interface SolicitudEpiCompleta {
    solicitudEpi: SolicitudEpi;
    epis: Array<Epi>;
    id_sucursal: string;
}

export function SOLICITUD_EPI_COMPLETA_BLANK(): SolicitudEpiCompleta {
    const aux = {
        solicitudEpi: null,
        epis: null,
        id_sucursal: null
    };
    return Object.assign(aux);
}


export interface SolicitudEpiTabla {
    id_solicitud: string;
    fecha_creacion: string;
    fecha_aprobacion: string;
    aprobada: string;
    email: string;
    materiales: Array<EpiTabla>;
}

export function SOLICITUD_EPI_TABLA_BLANK(): SolicitudEpiTabla {
    const aux = {
        id_solicitud: null,
        fecha_creacion: null,
        fecha_aprobacion: null,
        aprobada: null,
        email: null,
        materiales: null
    };
    return Object.assign(aux);
}

export interface EpiTabla{
    descripcion: string;
    image: string;
    cantidad_material_solicitado: number;
}

export function EPI_TABLA_BLANK(): EpiTabla {
    const aux = {
        descripcion: null,
        image: null,
        cantidad_material_solicitado: null
    };
    return Object.assign(aux);
}

export interface SolicitudEPIFiltros{
    email: string;
    estado: string;
    sucursal: string;
    id_propio: string;
}

export function SOLICITUD_EPI_FILTROS_BLANK(): SolicitudEPIFiltros {
    const aux = {
        email: null,
        estado: null,
        sucursal: null,
        id_propio: null
    };
    return Object.assign(aux);
}

