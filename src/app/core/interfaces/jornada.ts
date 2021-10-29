export interface Jornada {
    id_jornada: string;
    id_empleado: string;
    hora_inicio: string;
    hora_fin: string;
    horas_semanales: string;
    fecha_actualizacion: string;
    fecha_creacion: string;
}

export function JORNADA_BLANK(): Jornada {
    const aux = {
        id_jornada: null,
        id_empleado: null,
        hora_inicio: null,
        hora_fin: null,
        horas_semanales: null,
        fecha_creacion: null,
        fecha_actualizacion: null,
    };
    return Object.assign(aux);
}