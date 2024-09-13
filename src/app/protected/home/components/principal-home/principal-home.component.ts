import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { AuthService } from '../../../../auth/services/auth.service';
import { EmpresaService } from '../../services/empresa.service';
import { ROLES_USER_EMPRESA, getRoeslUser, havePermission } from '../../services/utils/getRolUser';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormUsersPermisosComponent } from '../form-users-permisos/form-users-permisos.component';

@Component({
  selector: 'app-principal-home',
  templateUrl: './principal-home.component.html',
  styleUrl: './principal-home.component.scss'
})
export class PrincipalHomeComponent implements OnInit {

  userName = this.authService.getUserData()?.firstname + ' ' + this.authService.getUserData()?.lastname;
  userNameToShow = '';
  loadingEmpresas = true;
  userEmpresas : any[] = [];
  rolesAplicacion: any[] = [];
  refFormUserAcces: DynamicDialogRef | undefined;

  constructor(
    private messageService: MessageService,
    private router: Router,
    private authService: AuthService,
    private empresaService: EmpresaService,
    private confirmationService: ConfirmationService,
    public dialogService: DialogService
  ) {
    this.userNameToShow = this.userName.length > 20 ? this.userName.slice(0, 20) + '...' : this.userName;
  }
  ngOnInit(): void {
    this.empresaService.getEmpresas().subscribe(data => {
      this.userEmpresas = data;
      this.loadingEmpresas = false;
      this.defineItmesEmpresas();
    });
    this.empresaService.getRolesAplication().subscribe(data => {
      this.rolesAplicacion = data;
    });
  }

  findRoleName(id: number) {
    return this.rolesAplicacion.find(role => role.id === id)?.nombreRol;
  }

  delete(empresa) {
    this.confirmationService.confirm({
      message: `Desea eliminar la empresa "${empresa.name}"`,
      header: 'Eliminar compañía',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass:"p-button-danger p-button-text",
      rejectButtonStyleClass:"p-button-text p-button-text",
      acceptIcon:"none",
      rejectIcon:"none",
      acceptLabel:"Eliminar",
      rejectLabel:"Cancelar",

      accept: () => {
        this.empresaService.deleteCompany(empresa.id).subscribe({
          next: () => {
            this.userEmpresas = this.userEmpresas.filter(userEmpresa => userEmpresa.id !== empresa.id);
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
          },
          error: () => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar la empresa' });
          }
        });
      },
      reject: () => {
          this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      }
  });
  }

  createitems(empresa): MenuItem[] {
    const admin_acces = havePermission(empresa.idsRoles, this.rolesAplicacion, ROLES_USER_EMPRESA.ADMIN_EMPRESA)
    return [
      {
          label: 'Ver',
          command: () => {
              this.update();
          }
      },
      admin_acces ? {
        label: 'Eliminar',
        command: () => {
            this.delete(empresa);
        }
    }
    : {},
      admin_acces ? {
          label: 'Editar',
          command: () => {
              this.update();
          }
      }
      : {},
      admin_acces ? {
          label: 'Accesos',
          command: () => {
              this.editUserAccess(empresa);
          }
      }
      : {}
  ];
  }

  save(severity: string) {
    this.messageService.add({ severity: severity, summary: 'Success', detail: 'Data Saved' });
  }

  update() {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Updated' });
  }

  drop(asd){
  }

  goToCreateCompany() {
    this.router.navigate(['gamype/create-company']);
  }

  defineItmesEmpresas(){
    this.userEmpresas.map(empresa => {
      empresa.items = this.createitems(empresa);
    });
  }

  editUserAccess(empresa){
    this.refFormUserAcces = this.dialogService.open(FormUsersPermisosComponent, {
      header: 'Select a Product',
      width: '50vw',
      contentStyle: { overflow: 'auto' },
      breakpoints: {
          '960px': '75vw',
          '640px': '90vw'
      },
  });

  this.refFormUserAcces.onClose.subscribe((data: any) => {
      let summary_and_detail;
      console.log('data', data);
      if (data) {
          const buttonType = data?.buttonType;
          summary_and_detail = buttonType ? { summary: 'No Product Selected', detail: `Pressed '${buttonType}' button` } : { summary: 'Product Selected', detail: data?.name };
      } else {
          summary_and_detail = { summary: 'No Product Selected', detail: 'Pressed Close button' };
      }
      this.messageService.add({ severity: 'info', ...summary_and_detail, life: 3000 });
  });

  this.refFormUserAcces.onMaximize.subscribe((value) => {
      this.messageService.add({ severity: 'info', summary: 'Maximized', detail: `maximized: ${value.maximized}` });
  });
  }
  
}
