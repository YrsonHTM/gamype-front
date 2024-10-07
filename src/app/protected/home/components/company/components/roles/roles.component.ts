import { Component, OnInit } from '@angular/core';
import { RolesService } from './roles.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CrearRolComponent } from './crear-rol/crear-rol.component';
import { Cargos } from './models/cargos.model';
import { take } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.scss'
})
export class RolesComponent implements OnInit {

  refFormUserAcces: DynamicDialogRef | undefined;
  
  cargos: Cargos[] = [];

  searchValue: string | undefined;

    constructor(
      private rolesService: RolesService,
      private dialogService: DialogService,
      private messageService: MessageService,
      private confirmationService: ConfirmationService
    ) { }

  ngOnInit(): void {
    this.rolesService.getCargosEmpresa().pipe(
      take(1)
    ).subscribe(cargos => {
      this.cargos = cargos;
    });
  }

  crearCargo(){
    this.refFormUserAcces = this.dialogService.open(CrearRolComponent, {
      header: 'Crear Cargo',
      width: '350px',
      contentStyle: { overflow: 'auto' },
  });

  this.refFormUserAcces.onClose.subscribe((data: any) => {
      if (data) {
        this.rolesService.crearCargo(data).pipe(take(1)).subscribe(
          {
            next: res => {
              if(!res) return;
              this.messageService.add({severity:'success', summary: 'Cargo Creado', detail: 'Cargo creado exitosamente'});
              this.rolesService.getCargosEmpresa().pipe(
                take(1)
              ).subscribe(cargos => {
                this.cargos = cargos;
              });
            },
            error: error => {
              this.messageService.add({severity:'error', summary: 'Error', detail: 'Error al crear el cargo'});
            }
          }
        );
    }
  });
  }

  editarCargo(cargo: Cargos){
    this.refFormUserAcces = this.dialogService.open(CrearRolComponent, {
      header: 'Editar Cargo',
      width: '350px',
      contentStyle: { overflow: 'auto' },
      data: cargo
  });

  this.refFormUserAcces.onClose.subscribe((data: any) => {
      if (data) {
        this.rolesService.crearCargo(data).subscribe({
          next: res => {
            if(!res) return;
            this.messageService.add({severity:'success', summary: 'Cargo Editado', detail: 'Cargo editado exitosamente'});
            this.rolesService.getCargosEmpresa().pipe(
              take(1)
            ).subscribe(cargos => {
              this.cargos = cargos;
            });
          },
          error: error => {
            this.messageService.add({severity:'error', summary: 'Error', detail: 'Error al editar el cargo'});
          }
        });
    }
  });
  }


  eliminar(cargo) {
    this.confirmationService.confirm({
      message: `Desea eliminar el cargo "${cargo?.nombre}"`,
      header: 'Eliminar cargo',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass:"p-button-danger p-button-text",
      rejectButtonStyleClass:"p-button-text p-button-text",
      acceptIcon:"none",
      rejectIcon:"none",
      acceptLabel:"Eliminar",
      rejectLabel:"Cancelar",

      accept: () => {
        this.rolesService.eliminarCargo(cargo.id).subscribe({
          next: () => {
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
            this.rolesService.getCargosEmpresa().pipe(
              take(1)
            ).subscribe(cargos => {
              this.cargos = cargos;
            });
          },
          error: () => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar el cargo' });
          }
        });
      },
      reject: () => {
          this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      }
  });
  }

}
