export interface Seleccionable {
    name: string;
    code: string;
}

export function SELECCIONABLE_BLANK(): Seleccionable {
    const aux = {
        name: '',
        code: '',
    };
    return Object.assign(aux);
}