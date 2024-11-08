// {
//     "id": 2,
//     "nombre": "prueba1",
//     "idEmpresa": 1,
//     "direccionFisica": "prueba",
//     "fechaCreacionRegistro": "2024-10-20T00:00:00.000+00:00",
//     "fechaFinalizacionRegistro": null,
//     "lotes": []

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