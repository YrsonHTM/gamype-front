
export interface operationCreate{
    name: string;
    description: string;
    isService: boolean;
}

export interface operationCreateResponse{
    id: number;
    name: string;
    description: string;
    companyId: number;
    isService: boolean;
    registrationDate: string;
    endDateRegistration: string;
}

export interface getOperation{
    id: number;
    name: string;
    description: string;
    isService: boolean;
}