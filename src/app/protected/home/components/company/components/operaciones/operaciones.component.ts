import { Component } from '@angular/core';
import { Cargos } from '../roles/models/cargos.model';
import { RolesService } from '../roles/roles.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { take } from 'rxjs';
import { CrearRolComponent } from '../roles/crear-rol/crear-rol.component';
import { OperacionesFormComponent } from './operaciones-form/operaciones-form.component';
import { OperacionesService } from './operaciones.service';
import { getOperation, operationCreate } from './models/operacion.model';

@Component({
  selector: 'app-operaciones',
  templateUrl: './operaciones.component.html',
  styleUrl: './operaciones.component.scss'
})
export class OperacionesComponent {
refFormUserAcces: DynamicDialogRef | undefined;
  
  operaciones: getOperation[] = [];

  searchValue: string | undefined;

    constructor(
      private operacionesService: OperacionesService,
      private dialogService: DialogService,
      private messageService: MessageService,
      private confirmationService: ConfirmationService
    ) { }

  ngOnInit(): void {
    this.loadOperaciones();
  }

  crearOperacion(){
    this.refFormUserAcces = this.dialogService.open(OperacionesFormComponent, {
      header: 'Crear Operacion',
      width: '350px',
      contentStyle: { overflow: 'auto' },
  });

  this.refFormUserAcces.onClose.subscribe((data: any) => {
      if (data) {
        this.operacionesService.crearOperacions(data).pipe(take(1)).subscribe(
          {
            next: res => {
              if(!res) return;
              this.messageService.add({severity:'success', summary: 'Operacion creada', detail: 'Operacion creada exitosamente'});
              this.loadOperaciones();
            },
            error: () => {
              this.messageService.add({severity:'error', summary: 'Error', detail: 'Error al crear la operacion'});
            }
          }
        );
    }
  });
  }

  editarOperacion(operacion: operationCreate){
    this.refFormUserAcces = this.dialogService.open(OperacionesFormComponent, {
      header: 'Editar Cargo',
      width: '400px',
      contentStyle: { overflow: 'auto' },
      data: operacion
  });

  this.refFormUserAcces.onClose.subscribe((data: any) => {
      if (data) {
        this.operacionesService.editarOperacion(data).subscribe({
          next: res => {
            if(!res) return;
            this.messageService.add({severity:'success', summary: 'Cargo Editado', detail: 'Operacion editada exitosamente'});
            this.loadOperaciones();
          },
          error: error => {
            this.messageService.add({severity:'error', summary: 'Error', detail: 'Error al editar el cargo'});
          }
        });
    }
  });
  }


  eliminar(operacion: getOperation) {
    this.confirmationService.confirm({
      message: `Desea eliminar la operacion "${operacion?.name}"`,
      header: 'Eliminar operacion',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass:"p-button-danger p-button-text",
      rejectButtonStyleClass:"p-button-text p-button-text",
      acceptIcon:"none",
      rejectIcon:"none",
      acceptLabel:"Eliminar",
      rejectLabel:"Cancelar",

      accept: () => {
        this.operacionesService.eliminarOperacion(operacion.id).subscribe({
          next: () => {
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Operacion eliminada' });
            this.loadOperaciones();
          },
          error: () => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar la operacion' });
          }
        });
      },
      reject: () => {
          this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      }
  });
  }

  loadOperaciones(){
    this.operacionesService.getOperacionesEmpresa().pipe(
      take(1)
    ).subscribe(operacion => {
      this.operaciones = operacion;
    });
  }
}
