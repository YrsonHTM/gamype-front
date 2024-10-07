export interface Sectores {
    id: number;
    nombre: string;
    descripcion: string;
    claseEmpresas: ClaseEmpresas[];
}

export interface ClaseEmpresas {
    id: number;
    idClasificacion: number;
    nombre: string;
    descripcion: string;
}

export interface Tamagnio {
    id: number;
    nombre: string;
    descripcion: string;
    claseEmpresas: ClaseEmpresas[];
}