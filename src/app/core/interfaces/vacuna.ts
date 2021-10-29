export interface Vacuna {
    id_vacuna: string;
    id_empleado: string;
    id_tipo_vacuna: string;
    pauta_completa: string;
    fecha_vacuna: string;
    nombre_archivo:string;
    fecha_creacion: string;
    fecha_actualizacion:string;
}

export function VACUNA_BLANK(): Vacuna {
    const aux = {
        id_vacuna: null,
        id_empleado: null,
        id_tipo_vacuna: null,
        pauta_completa: null,
        fecha_vacuna: null,
        nombre_archivo: null,
        fecha_creacion: null,
        fecha_actualizacion: null
    };
    return Object.assign(aux);
}