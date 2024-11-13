import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EmpresaService } from '../../services/empresa.service';
import { UsersEmpresa } from '../../services/utils/users-empresa.interface';
import { FormUserPermisoComponent } from './components/form-user-permiso/form-user-permiso.component';
import { MessageService } from 'primeng/api';
import { EditUserPermisoComponent } from './components/edit-user-permiso/edit-user-permiso.component';

@Component({
  selector: 'app-form-users-permisos',
  templateUrl: './form-users-permisos.component.html',
  styleUrl: './form-users-permisos.component.scss'
})
export class FormUsersPermisosComponent implements OnInit {

  users: UsersEmpresa[] = [];
  refFormUserAcces: DynamicDialogRef | undefined;

  constructor(
    public ref: DynamicDialogRef,
    private empresaService: EmpresaService,
    public config: DynamicDialogConfig,
    public dialogService: DialogService,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.empresaService.getUsersByCompany(this.config.data.id).subscribe(data => {
      this.users = data;
    });
  }

  userRoles(user: UsersEmpresa): string {
    return user.roles.map(role => role.nombreRol
    ).join(', ');
  }

  closeDialog(ref) {
      this.ref.close(ref);
  }

  editUser(user) {
    this.refFormUserAcces = this.dialogService.open(EditUserPermisoComponent, {
      header: 'Editar Usuario ' + user.nombreUsuario,
      width: '350px',
      data: user.roles,
      contentStyle: { overflow: 'auto' },
  });

  this.refFormUserAcces.onClose.subscribe((data: any) => {
      if (data) {
          const paBack = {
              idEmpresa: this.config.data.id,
              idUsuario: user.idUsuario,
              idsRol: data.idRoles.map(role => role.id)
          }
          this.empresaService.asignarRolEmpresa(paBack).subscribe({
            next: (value) => {
              if(value) {
                  this.messageService.add({ severity: 'success', summary: 'Usuario actualizado', detail: `Usuario ${user.nombreUsuario} actualizado correctamente` });
                  this.empresaService.getUsersByCompany(this.config.data.id).subscribe(data => {
                      this.users = data;
                  });
              }
          },
          error: (error) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
          }
          });
      }
  });
  }

  addUser() {
    this.refFormUserAcces = this.dialogService.open(FormUserPermisoComponent, {
      header: 'Agregar Usuario',
      width: '350px',
      data: this.users,
      contentStyle: { overflow: 'auto' },
  });

  this.refFormUserAcces.onClose.subscribe((data: any) => {
      if (data) {
          const paBack = {
              idEmpresa: this.config.data.id,
              idUsuario: data.idUsuario.idUsuario,
              idsRol: data.idRoles.map(role => role.id)
          }
          this.empresaService.asignarRolEmpresa(paBack).subscribe((value) => {
              if(value) {
                  this.messageService.add({ severity: 'success', summary: 'Usuario Agregado', detail: `Usuario ${data.idUsuario.email} agregado correctamente` });
                  this.empresaService.getUsersByCompany(this.config.data.id).subscribe(data => {
                      this.users = data;
                  });
              }
          });
      }
  });
  }

}
