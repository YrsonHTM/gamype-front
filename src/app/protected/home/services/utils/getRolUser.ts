import { RolesTypes } from "./roles-types";

export const ROLES_USER_EMPRESA = {
    ADMIN_EMPRESA: 'Administrador total',
    ADMIN_INVENTARIO: 'Administrador de inventario',
    ADMIN_RECURSOS_HUMANOS: 'Administrador de personal',
}

export function getRoeslUser(rol: number[], rolesApp: RolesTypes[]): string[] {
    return rol.map(r => rolesApp.find(role => role.id === r)?.nombreRol);
}

export function havePermission(rol: number[], rolesApp: RolesTypes[], rolRequired: string): boolean {
    return rol.some(r => rolesApp.find(role => role.id === r)?.nombreRol === rolRequired);
}