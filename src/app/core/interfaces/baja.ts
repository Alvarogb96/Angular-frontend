export interface SolicitudBaja {
    id_solicitud_baja: number;
    id_empleado: number;
    id_directivo: number;
    motivo: string;
    fecha_creacion: string;
    fecha_aprobacion: string;
    fecha_baja: string;
    fecha_alta: string;
    aprobada: string;
    archivo_solicitud_baja: string;
}

export function SOLICITUD_BAJA_BLANK(): SolicitudBaja {
    const aux = {
        id_solicitud_baja: null,
        id_empleado: null,
        id_directivo: null,
        motivo: '',
        fecha_solicitud: '',
        fecha_creacion: null,
        fecha_baja: null,
        fecha_alta: null,
        aprobada: null,
        archivo_solicitud_baja: null,
    };
    return Object.assign(aux);
}

export interface BajaAnalisis {
    mes: number;
    año: number;
    bajas: number;
    altas: number;
}

export function BAJA_ANALISIS_BLANK(): BajaAnalisis {
    const aux = {
        mes: null,
        año: null,
        bajas: 0,
        altas: 0
    };
    return Object.assign(aux);
}