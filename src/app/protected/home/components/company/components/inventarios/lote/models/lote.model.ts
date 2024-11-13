import { Elemento } from "../../../elementos/models/elementos.model";

export interface Lote {
    id: number;
    lote: string;
    idElemento: number | any;
    existencias: number;
    valorUnitario: number;
    idInventario: number;
    elemento: Elemento;
}