import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeprotectedComponent } from './components/homeprotected/homeprotected.component';
import { FormEmpresaComponent } from './components/form-empresa/form-empresa.component';
import { PrimeNgModulesModule } from '../../prime-ng-modules/prime-ng-modules.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '../../layout/layout.module';
import { PrincipalHomeComponent } from './components/principal-home/principal-home.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UserSettingsComponent } from './components/user-settings/user-settings.component';
import { SelectComponent } from '../../layout/transversal-components/select/select.component';
import { ShortRolPipe } from './custom-pipes/short-rol.pipe';
import { DialogService } from 'primeng/dynamicdialog';
import { FormUsersPermisosComponent } from './components/form-users-permisos/form-users-permisos.component';
import { FormUserPermisoComponent } from './components/form-users-permisos/components/form-user-permiso/form-user-permiso.component';
import { EditUserPermisoComponent } from './components/form-users-permisos/components/edit-user-permiso/edit-user-permiso.component';


@NgModule({
  declarations: [
    HomeprotectedComponent,
    FormEmpresaComponent,
    PrincipalHomeComponent,
    UserSettingsComponent,
    ShortRolPipe,
    FormUsersPermisosComponent,
    FormUserPermisoComponent,
    EditUserPermisoComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    PrimeNgModulesModule,
    ReactiveFormsModule,
    FormsModule,
    LayoutModule,
    SelectComponent
  ],
  providers: [MessageService,ConfirmationService,DialogService]
})
export class HomeModule { }
