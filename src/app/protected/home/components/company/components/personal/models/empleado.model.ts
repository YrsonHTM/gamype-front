export interface Empleado {
    id: number | null;
    nombres: string;
    apellidos: string;
    nombresApellidos?: string;
    idTipoDocumentoIdentificacion?: number;
    numeroIdentificacion?: string;
    identificadorEmpresa: string;
    telefonoLaboral: string;
    correoElectronicoLaboral: string;
    direccionVivienda: string;
    idCargo: number | null;
    salario: number;
    horasSemanales: number;
    idTipoContrato: number | null;
    notas: string;
    fechaContratacion: string;
    fechaFinalizacionContratacion: string | null;
    motivoFinalizacionContratacion: string | null;
    idSupervisor: number | null;
}