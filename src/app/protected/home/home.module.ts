import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeprotectedComponent } from './components/homeprotected/homeprotected.component';
import { FormEmpresaComponent } from './components/form-empresa/form-empresa.component';
import { PrimeNgModulesModule } from '../../prime-ng-modules/prime-ng-modules.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '../../layout/layout.module';
import { PrincipalHomeComponent } from './components/principal-home/principal-home.component';
import { MessageService } from 'primeng/api';
import { UserSettingsComponent } from './components/user-settings/user-settings.component';


@NgModule({
  declarations: [
    HomeprotectedComponent,
    FormEmpresaComponent,
    PrincipalHomeComponent,
    UserSettingsComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    PrimeNgModulesModule,
    ReactiveFormsModule,
    FormsModule,
    LayoutModule
  ],
  providers: [MessageService]
})
export class HomeModule { }
