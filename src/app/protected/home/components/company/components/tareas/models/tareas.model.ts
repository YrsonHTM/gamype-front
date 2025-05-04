export interface Tarea {
    id: number;
    title: string;
    description: string;
    startDate: string;
    estimatedEndDate: string;
    idCompany: number;
    idStateTask: number;
    estadoName?: string;
    employees: EmpleadoTarea[];
}

export interface EmpleadoTarea {
    id: number;
    nombres: string;
    apellidos: string;
}

export interface TareaEstado {
    id: number;
    title: string;
    descrpcion: string;
}

export interface TareaRequest {
    id?: number;
    title: string;
    description: string;
    startDate: string;
    estimatedEndDate: string;
    idStateTask: number;
    idCompany: number;
    employeeIds: number[];
}

export interface ConstantesNomina {
    salarioMinimo: number;
    auxilioTransporte: number;
    salarioIntegralMinimo: number;
    porcentajeSaludEmpleador: number;
    porcentajeSaludTrabajador: number;
    porcentajePensionEmpleador: number;
    porcentajePensionTrabajador: number;
    porcentajeARL: number;
    porcentajeSENA: number;
    porcentajeICBF: number;
    porcentajeCajasCompensacion: number;
    porcentajeAporteParafiscalIntegral: number;
    porcentajePrimaServicios: number;
    porcentajeCesantias: number;
    porcentajeInteresesCesantias: number;
    porcentajeVacaciones: number;
    recargoExtraDiurno: number;
    recargoNocturno: number;
    recargoExtraNocturno: number;
    recargoDominicalFestivo: number;
    recargoExtraDiurnoDominicalFestivo: number;
    recargoNocturnoDominicalFestivo: number;
    horasDiurnasInicio: number;
    horasDiurnasFin: number;
    horasNocturnasInicio: number;
    horasNocturnasFin: number;
    diasLaboralesMes: number;
    diasLaboralesAno: number;
    fondoSolidaridadPensional: number;
}