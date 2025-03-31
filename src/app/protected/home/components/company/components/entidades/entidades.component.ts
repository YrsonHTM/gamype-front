import { Component, inject, OnInit } from '@angular/core';
import { EntidadesService } from './entidades.service';
import { FormEntidadComponent } from './form-entidad/form-entidad.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EntidadCreate, GetEntidad, ResponseEntidadModal } from './models/entidad.model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-entidades',
  templateUrl: './entidades.component.html',
  styleUrl: './entidades.component.scss'
})
export class EntidadesComponent implements OnInit {

  entidadesService: EntidadesService = inject(EntidadesService);

  refFormUserAcces: DynamicDialogRef | undefined;

  dialogService = inject(DialogService);

  messageService = inject(MessageService);

  companyService = inject(CompanyService);

  confirm = inject(ConfirmationService);
  
  searchValue: string = '';

  provedores: GetEntidad[] = [];

  clientes: GetEntidad[] = [];

  ngOnInit(): void {
    this.getProvedores();
    this.getClientes();
  }

  crear(relationType: boolean): void {
        this.refFormUserAcces = this.dialogService.open(FormEntidadComponent, {
          header: relationType ? 'Crear provedor' : 'Crear cliente',
          width: '400px',
          contentStyle: { overflow: 'auto' },
      });
    
      this.refFormUserAcces.onClose.subscribe((data: ResponseEntidadModal) => {
          if (data) {
            const paBack: EntidadCreate = {
              name: data.name,
              documentTypeId: data.documentTypeId.id,
              identificationCode: data.identificationCode,
              contactPhone: data.contactPhone,
              email: data.email,
              companyId: this.companyService.getCompanyId(),
              isNaturalPerson: data.isNaturalPerson === 'Persona Natural' ? true : false,
              relationType: relationType,
            }
            this.entidadesService.CreateEntidades(paBack).subscribe({
              next: (data) => {
                this.messageService.add({severity:'success', summary: 'Exito', detail: 'Registro exitoso'});
                if(relationType){
                  this.getProvedores();
                }
                else{
                  this.getClientes();
                }
              },
              error: (error) => {
                this.messageService.add({severity:'error', summary: 'Error', detail: 'Error al registrar'});
              }
            });
        }
      });
  }

  getClientes(): void {
    this.entidadesService.getEntidades(false).subscribe({
      next: (data) => {
        this.clientes = data;
      },
      error: (error) => {
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Error al obtener los datos'});
      }
    });
  }

  getProvedores(): void {
    this.entidadesService.getEntidades(true).subscribe({
      next: (data) => {
        this.provedores = data;
      },
      error: (error) => {
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Error al obtener los datos'});
      }
    });
  }

  editar(provedor): void {
    this.refFormUserAcces = this.dialogService.open(FormEntidadComponent, {
      header: provedor.relationType ? 'Editar provedor' : 'Editar cliente',
      width: '400px',
      contentStyle: { overflow: 'auto' },
      data: provedor
  });

  this.refFormUserAcces.onClose.subscribe((data: ResponseEntidadModal) => {
      if (data) {
        const paBack: EntidadCreate = {
          id: data.id,
          name: data.name,
          documentTypeId: data.documentTypeId.id,
          identificationCode: data.identificationCode,
          contactPhone: data.contactPhone,
          email: data.email,
          companyId: this.companyService.getCompanyId(),
          isNaturalPerson: data.isNaturalPerson === 'Persona Natural' ? true : false,
          relationType: data.relationType,
        }
        this.entidadesService.CreateEntidades(paBack).subscribe({
          next: (data) => {
            this.messageService.add({severity:'success', summary: 'Exito', detail: 'Registro exitoso'});
            if(provedor.relationType){
              this.getProvedores();
            }
            else{
              this.getClientes();
            }
          },
          error: (error) => {
            this.messageService.add({severity:'error', summary: 'Error', detail: 'Error al registrar'});
          }
        });
    }
  });
  }

  eliminar(provedor): void {
    this.confirm.confirm({
      header: provedor.relationType ? 'Eliminar provedor' : 'Eliminar cliente',
      message: '¿Está seguro que desea eliminar este registro?',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass:"p-button-success p-button-text",
      rejectButtonStyleClass:"p-button-text p-button-text",
      acceptIcon:"none",
      rejectIcon:"none",
      acceptLabel:"Confirmar",
      rejectLabel:"Cancelar",
      accept: () => {
        this.entidadesService.deleteEntidad(provedor.id).subscribe({
          next: (data) => {
            this.messageService.add({severity:'success', summary: 'Exito', detail: 'Registro eliminado'});
            if(provedor.relationType){
              this.getProvedores();
            }
            else{
              this.getClientes();
            }
          },
          error: (error) => {
            this.messageService.add({severity:'error', summary: 'Error', detail: 'Error al eliminar'});
          }
        });
      }
    });
  }

}
