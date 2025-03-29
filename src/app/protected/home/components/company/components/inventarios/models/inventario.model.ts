import { Lote } from "../lote/models/lote.model";

// }
export interface getInventario {
    id: number;
    nombre: string;
    idEmpresa: number;
    direccionFisica: string;
    fechaCreacionRegistro: string;
    fechaFinalizacionRegistro: string;
    lotes: any[];
}

export interface Inventario {
    id?: number;
    nombre: string;
    lotes?: Lote[];
    direccionFisica: string;
}
export interface getInventarioHistorial{
    id: number;
    name: string;
    description: string;
    isService: boolean;
    executions: getEjecuciones[];
}

export interface getEjecuciones{
    id: number;
    operationType: string;
    concept: string;
    registeredBy: string;
    registrationDate: string;
    executionDate: string;
    movements: movimientoEjecucion[];
}

export interface movimientoEjecucion{
    id: number;
    sourceBatchId: number;
    sourceBatch: string;
    sourceBatchItem: string;
    movedStock: number;
    entryAmount: number;
    exitAmount: number;
    stockBeforeMovement: number;
    stockAfterMovement: number;
    movementType: string;
    movementDate: string;
}