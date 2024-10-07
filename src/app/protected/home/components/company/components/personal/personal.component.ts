import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CrearEmpleadoComponent } from './crear-empleado/crear-empleado.component';
import { Empleado } from './models/empleado.model';
import { EmpleadoService } from './empleado.service';
import { take } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrl: './personal.component.scss'
})
export class PersonalComponent implements OnInit {

  refFormUserAcces: DynamicDialogRef | undefined;

  searchValue: string | undefined;

  empleados: Empleado[] = [];

  constructor(
    private dialogService: DialogService,
    private empleadoService: EmpleadoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService

  ) { }

  ngOnInit(): void {
    this.empleadoService.getEmpleados().subscribe(empleados => {
      this.empleados = empleados;
    });
  }

  crearEmpleado(){
    this.refFormUserAcces = this.dialogService.open(CrearEmpleadoComponent, {
      header: 'Crear empleado',
      contentStyle: { overflow: 'auto' },
  });

  this.refFormUserAcces.onClose.subscribe((data: any) => {
      if (data) {
        const paBack = {
          id: data.id,
          nombres: data.nombres,
          apellidos: data.apellidos,
          identificadorEmpresa: data.identificadorEmpresa,
          telefonoLaboral: data.telefonoLaboral,
          correoElectronicoLaboral: data.correoElectronicoLaboral,
          direccionVivienda: data.direccionVivienda,
          idCargo: data?.idCargo?.id || null,
          salario: data.salario,
          horasSemanales: data.horasSemanales,
          idTipoContrato: data.idTipoContrato?.id || null,
          notas: data.notas,
          fechaContratacion: this.formatFecha(data.fechaContratacion),
          fechaFinalizacionContratacion: this.formatFecha(data.fechaFinalizacionContratacion),
          motivoFinalizacionContratacion: data.motivoFinalizacionContratacion,
          idSupervisor: data.idSupervisor?.id || null,
          idTipoDocumentoIdentificacion: data.idTipoDocumentoIdentificacion?.id || null,
          numeroIdentificacion: data.numeroIdentificacion
        };
        this.empleadoService.crearEmpleado(paBack as Empleado).subscribe({
          next: res => {
            if(!res) return;
            this.messageService.add({severity:'success', summary: 'Empleado Creado', detail: 'Empleado creado exitosamente'});
            this.empleadoService.getEmpleados().pipe(take(1)).subscribe(empleados => {
              this.empleados = empleados;
            });
          },
          error: error => {
            this.messageService.add({severity:'error', summary: 'Error', detail: 'Error al crear el empleado'});
          }
        });
        // this.rolesService.crearCargo(data).pipe(take(1)).subscribe(
    }
  });
  }

  formatFecha(dateString: string): string {
    if(!dateString) return null;
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}T00:00:00`;
  }

  editarEmpleado(empleado){
    this.refFormUserAcces = this.dialogService.open(CrearEmpleadoComponent, {
      header: 'Editar empleado',
      contentStyle: { overflow: 'auto' },
      data: empleado.id
  });

  this.refFormUserAcces.onClose.subscribe((data: any) => {
      if (data) {
        const paBack = {
          id: data.id,
          nombres: data.nombres,
          apellidos: data.apellidos,
          identificadorEmpresa: data.identificadorEmpresa,
          telefonoLaboral: data.telefonoLaboral,
          correoElectronicoLaboral: data.correoElectronicoLaboral,
          direccionVivienda: data.direccionVivienda,
          idCargo: data?.idCargo?.id || null,
          salario: data.salario,
          horasSemanales: data.horasSemanales,
          idTipoContrato: data.idTipoContrato?.id || null,
          notas: data.notas,
          fechaContratacion: this.formatFecha(data.fechaContratacion),
          fechaFinalizacionContratacion: this.formatFecha(data.fechaFinalizacionContratacion),
          motivoFinalizacionContratacion: data.motivoFinalizacionContratacion,
          idSupervisor: data.idSupervisor?.id || null,
          idTipoDocumentoIdentificacion: data.idTipoDocumentoIdentificacion?.id || null,
          numeroIdentificacion: data.numeroIdentificacion
        };
        this.empleadoService.crearEmpleado(paBack as Empleado).subscribe({
          next: res => {
            if(!res) return;
            this.messageService.add({severity:'success', summary: 'Empleado Editado', detail: 'Empleado editado exitosamente'});
            this.empleadoService.getEmpleados().pipe(take(1)).subscribe(empleados => {
              this.empleados = empleados;
            });
          },
          error: error => {
            this.messageService.add({severity:'error', summary: 'Error', detail: 'Error al editar el empleado'});
          }
        });

    }
  });
  }

  eliminarEmpleado(empleado){
    this.confirmationService.confirm({
      message: `Desea eliminar el empleado "${empleado?.nombresApellidos}"`,
      header: 'Eliminar cargo',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass:"p-button-danger p-button-text",
      rejectButtonStyleClass:"p-button-text p-button-text",
      acceptIcon:"none",
      rejectIcon:"none",
      acceptLabel:"Eliminar",
      rejectLabel:"Cancelar",
      accept: () => {
        this.empleadoService.deleteEmpleado(empleado.id).subscribe({
          next: () => {
            this.messageService.add({severity:'success', summary: 'Empleado Eliminado', detail: 'Empleado eliminado exitosamente'});
            this.empleadoService.getEmpleados().pipe(take(1)).subscribe(empleados => {
              this.empleados = empleados;
            });
          },
          error: () => {
            this.messageService.add({severity:'error', summary: 'Error', detail: 'Error al eliminar el empleado'});
          }
        });
      }
    });
  }
  
  view($event){
    console.log($event);
  }

}
