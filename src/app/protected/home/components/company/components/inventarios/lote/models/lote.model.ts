import { Elemento } from "../../../elementos/models/elementos.model";
import { getOperation } from "../../../operaciones/models/operacion.model";

export interface Lote {
    id?: number;
    lote: string;
    idElemento: number | any;
    existencias: number;
    valorUnitario: number;
    idInventario: number;
    elemento: Elemento;
}

export interface MovimientoCreate {
    operationTypeId: number;
    concept: string;
    executionDate: string;
    relatedEntityId: number;
    movements: Movement[];
}

export interface Movement {
    sourceBatchId: number;
    movedtStock: number;
    entryAmount: number;
}

export interface compraLoteResponse {
    concept: string;
    executionDate: Date;
    idElemento: Elemento;
    lote: string;
    movedStock: number;
    operacion: getOperation;
    valorUnitario: number;
    relatedEntityId: {
        id: number;
        name: string;
    };
}