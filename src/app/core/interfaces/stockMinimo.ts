export interface StockMinimoTabla {
    id_tipo_epi: string;
    descripcion: string;
    image: string;
    minimo: number;
    idsucursales_stock_epi: string;
    
}

export interface StockMinimo {
    id_tipo_epi: string;
    id_sucursal: string;
    fecha_creacion: string;
    fecha_actualizacion: string;
    minimo: string;
    idsucursales_stock_epi: string;
    
}


export function STOCK_MINIMO_TABLA_BLANK(): StockMinimoTabla {
    const aux = {
        id_tipo_epi: null,
        descripcion: null,
        image: null,
        minimo: 0,
        idsucursales_stock_epi: null
    };
    return Object.assign(aux);
}

export function STOCK_MINIMO_BLANK(): StockMinimo {
    const aux = {
        id_tipo_epi: null,
        id_sucursal:null,
        fecha_creacion: null,
        fecha_actualizacion: null,
        minimo: null,
        idsucursales_stock_epi: null
    };
    return Object.assign(aux);
}