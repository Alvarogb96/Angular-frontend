export interface Test {
    id_test: string;
    id_empleado: string;
    id_tipo: string;
    resultado: string;
    clinica: string;
    fecha_test: string;
    nombre_archivo:string;
    fecha_creacion: string;
    fecha_actualizacion:string;
}

export function TEST_BLANK(): Test {
    const aux = {
        id_test: null,
        id_empleado: null,
        id_tipo: null,
        resultado: null,
        clinica: null,
        fecha_test: null,
        nombre_archivo: null,
        fecha_creacion: null,
        fecha_actualizacion: null
    };
    return Object.assign(aux);
}