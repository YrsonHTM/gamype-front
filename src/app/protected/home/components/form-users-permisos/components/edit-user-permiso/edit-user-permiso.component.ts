import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { EmpresaService } from '../../../../services/empresa.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Roles, UsersEmpresa } from '../../../../services/utils/users-empresa.interface';

@Component({
  selector: 'app-edit-user-permiso',
  templateUrl: './edit-user-permiso.component.html',
  styleUrl: './edit-user-permiso.component.scss'
})
export class EditUserPermisoComponent {

  users: UsersEmpresa[] = [];
  formUserPermiso: FormGroup;
  filteredUserOptions: any[] = [];
  Roles: any[] = [];
  currentRoles: Roles[]= [];

  constructor(
    private fb: FormBuilder,
    private empresaService: EmpresaService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
  ) {
  
  }

  ngOnInit(): void {
    this.currentRoles = this.config.data;
    this.formBuild();
    this.loadRoles();
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
      idRoles: [this.currentRoles],
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
