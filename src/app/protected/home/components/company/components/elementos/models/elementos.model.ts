export interface Elemento {
    id?: number;
    nombre: string;
    codigo: string;
    descripcion: string;
    codigoAndNombre?: string;
    idUnidadMedidaTipica?: number;
    name?: string;
    unidadMedidaTipica?: {
        id: number;
        nombre: string;
    };
    typicalMeasureUnitId?: number;
}

export interface getUnidad{
    id: number;
    nombre: string;
}