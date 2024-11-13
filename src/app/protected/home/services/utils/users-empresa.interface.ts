export interface UsersEmpresa {
    idUsuario: number;
    nombreUsuario: string;
    roles: Roles[];
}

export interface Roles {
    id: number;
    nombreRol: string;
}