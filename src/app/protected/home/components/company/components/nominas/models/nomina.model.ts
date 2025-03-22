export interface Arl {
    id: number;
    nombreClase: string;
}

export interface NominaResumen {
    id: number;
    fechaNomina: string;
    fechaRegistro: string;
    fraccionMes: boolean;
    salarioMensualQuincenal: number;
    totalDevengado: number;
    totalParafiscales: number;
    totalPrestacionesSociales: number;
    totalSeguridadSocialEmpleador: number;
    totalSeguridadSocialTrabajador: number;
    valorNetoPagarTrabajador: number;
    valorTotalCargoEmpleador: number;
}

export interface CalculoNomina{
    idEmpleado: number;
    fechaNomina: string;
    fraccionMes: boolean;
    salarioMensualQuincenal: number;
    comisiones: number;
    recargoNocturnoOrdinario: number;
    trabajoExtraSuplementario: number;
    trabajoDominicalFestivo: number;
    auxilioTransporte: number;
    exentoAportesParafiscales: boolean;
    idNivelRiesgoLaboral: number;
    idNomina: number;
}

export interface caracteristicasNomina{
    auxilioTransporte: number;
    comisiones: number;
    exentoAportesParafiscales: boolean;
    fechaNomina: string;
    fraccionMes: boolean;
    id: number;
    idEmpleado: number;
    idNivelRiesgoLaboral: number;
    idNomina: number;
    recargoNocturnoOrdinario: number;
    salarioMensualQuincenal: number;
    trabajoDominicalFestivo: number;
    trabajoExtraSuplementario: number;
}

export interface Nomina{
    id: number;
    idEmpleado: number;
    salarioMensual: number;
    comisiones: number;
    recargosNocturnosOrdinarios: number;
    trabajoExtraSuplementario: number;
    recargosDominicalesFestivos: number;
    auxilioTransporte: number;
    totalDevengado: number;
    primaServicios: number;
    auxilioCesantias: number;
    interesesCesantias: number;
    provisionVacaciones: number;
    totalPrestacionesSociales: number;
    sena: number;
    icbf: number;
    cajasCompensacion: number;
    totalParafiscales: number;
    aportesSaludEmpleador: number;
    aportesPensionEmpleador: number;
    aportesArl: number;
    totalSeguridadSocialEmpleador: number;
    aportesSaludTrabajador: number;
    aportesPensionTrabajador: number;
    totalSeguridadSocialTrabajador: number;
    valorTotalCargoEmpleador: number;
    valorNetoPagarTrabajador: number;
    fondoSolidaridadPensional: number;
    idEmpresa: number;
    idCaracteristicas: number;
    fechaRegistro: string;
}