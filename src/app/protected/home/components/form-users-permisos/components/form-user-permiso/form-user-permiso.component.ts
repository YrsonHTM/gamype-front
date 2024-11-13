import { Component, OnInit } from '@angular/core';
import { UsersEmpresa } from '../../../../services/utils/users-empresa.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { EmpresaService } from '../../../../services/empresa.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-form-user-permiso',
  templateUrl: './form-user-permiso.component.html',
  styleUrl: './form-user-permiso.component.scss'
})
export class FormUserPermisoComponent implements OnInit {

  users: UsersEmpresa[] = [];
  formUserPermiso: FormGroup;
  filteredUserOptions: any[] = [];
  Roles: any[] = [];
  currentUserEmpresa: any;

  constructor(
    private fb: FormBuilder,
    private empresaService: EmpresaService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
  ) {
  
  }

  ngOnInit(): void {
    this.formBuild();
    this.loadRoles();
    this.validateForm();
    this.currentUserEmpresa = this.config.data;
  }

  loadRoles() {
    this.empresaService.getRolesAplication().pipe(
      take(1)
    ).subscribe((value) => {
      this.Roles = value;
    });
  }

  formBuild() {
    this.formUserPermiso = this.fb.group({
      idUsuario: ['', [Validators.required]],
      idRoles: [[], [Validators.required]],
    });
    this.formUserPermiso.get('idRoles').disable();
  }

  filterUser($event) {
    this.empresaService.getUserByEmail($event.query).pipe(
      take(1)
    ).subscribe((value) => {
      this.filteredUserOptions = value;
      //elimina los usuarios que ya estan asignados en CurrentUserEmpresa
      this.filteredUserOptions = this.filteredUserOptions.filter((user) => {
        return !this.currentUserEmpresa.some((userEmpresa) => userEmpresa.idUsuario === user.idUsuario);
      }
      );
    });
  }

  validateForm(){
    this.formUserPermiso.get('idUsuario').valueChanges.subscribe((value) => {
      if(value?.idUsuario && this.formUserPermiso.get('idUsuario').valid){
        this.formUserPermiso.get('idRoles').enable();
      }
    });
  }

  closeDialog(ref) {
    this.formUserPermiso.markAllAsTouched();
    Object.keys(this.formUserPermiso.controls).forEach(field => {
      const control = this.formUserPermiso.get(field);
      control.markAsDirty();
    });
    if(ref){
      if(this.formUserPermiso.invalid)
        return;
    }
      this.ref.close(ref);
  }

}
