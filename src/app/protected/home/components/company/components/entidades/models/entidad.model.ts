export interface EntidadCreate{
    id?: number;
    name: string;
    documentTypeId: number;
    identificationCode: string;
    contactPhone: string;
    email: string;
    companyId: number;
    isNaturalPerson: boolean;
    relationType: boolean;
}

export interface DocumentType{
    id: number;
    nombre: string;
    descripcion: string;
    sigla: string;
    tipoDocumento: string;
}

export interface ResponseEntidadModal{
    contactPhone: string;
    documentTypeId: DocumentType;
    email: string;
    id: number;
    identificationCode: string;
    isNaturalPerson: string;
    name: string;
    relationType: boolean;
}

export interface GetEntidad{
    id: number;
    name: string;
}
