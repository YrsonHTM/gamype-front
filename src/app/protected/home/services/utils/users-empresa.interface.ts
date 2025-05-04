export interface UsersEmpresa {
    idUsuario: number;
    nombreUsuario: string;
    roles: Roles[];
}

export interface Master {
    id: number;
    name: string;
    icon: string;
    economicSector: string;
    companySyze: string;
    societyType: string;
    creationUsername: string;
    registerDate: string;
    foundationDate: string;
}

export interface Roles {
    id: number;
    nombreRol: string;
}
export interface CompanyClasses {
    id: number;
    idClasificacion: number;
    nombre: string;
    descripcion: string;
}

export interface GeneralSociedadesMercantiles {
    id: number;
    nombre: string;
    descripcion: string;
    companyClasses: CompanyClasses[];
}
export interface CreateEmpresa {
    id: number;
    name: string;
    companyName: string;
    userCreationId: number;
    foundationDate: string;
    registerDate: string;
    finishingRegistrationDate: string;
    contactNumber: string;
    addres: string;
    email: string;
    webSite: string;
    icon: string;
    idTamagnio: number;
    idTipoSociedadMercantil: number;
    idSectorEconomico: number;
    tamagnio: null;
}

export interface GetEmpresas{
    id: number;
    name: string;
    icon: string;
    sector: string;
    tamagnio: string;
    tipoSociedad: string;
    idsRoles: number[];
    items?: any[];
}
export interface GetUserByEmail{
    idUsuario: number;
    correo: string;
}
export interface InfoEmpresa{
    id: number;
    name: string;
    companyName: string;
    userCreationId: number;
    foundationDate: string;
    registerDate: string;
    finishingRegistrationDate: string;
    contactNumber: string;
    addres: string;
    email: string;
    webSite: string;
    icon: string;
    idTamagnio: number;
    idTipoSociedadMercantil: number;
    idSectorEconomico: number;
    tamagnio: string;
}