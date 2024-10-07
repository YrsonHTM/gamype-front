import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyRoutingModule } from './company-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { DashBoardComponent } from './components/dash-board/dash-board.component';
import { PrimeNgModulesModule } from '../../../../prime-ng-modules/prime-ng-modules.module';
import { MenuBarComponent } from './layout/menu-bar/menu-bar.component';
import { RolesComponent } from './components/roles/roles.component';
import { CrearRolComponent } from './components/roles/crear-rol/crear-rol.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PersonalComponent } from './components/personal/personal.component';
import { CrearEmpleadoComponent } from './components/personal/crear-empleado/crear-empleado.component';


@NgModule({
  declarations: [
    LayoutComponent,
    DashBoardComponent,
    MenuBarComponent,
    RolesComponent,
    CrearRolComponent,
    PersonalComponent,
    CrearEmpleadoComponent
  ],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    PrimeNgModulesModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class CompanyModule { }
