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
import { InventariosComponent } from './components/inventarios/inventarios.component';
import { ElementosComponent } from './components/elementos/elementos.component';
import { ElementoformComponent } from './components/elementos/elementoform/elementoform.component';
import { CrearInventarioComponent } from './components/inventarios/crear-inventario/crear-inventario.component';
import { BeatyDatePipe } from './components/beaty-date.pipe';
import { LoteComponent } from './components/inventarios/lote/lote.component';
import { FormLotesComponent } from './components/inventarios/lote/form-lotes/form-lotes.component';
import { FormExistenciasComponent } from './components/inventarios/lote/form-existencias/form-existencias.component';


@NgModule({
  declarations: [
    LayoutComponent,
    DashBoardComponent,
    MenuBarComponent,
    RolesComponent,
    CrearRolComponent,
    PersonalComponent,
    CrearEmpleadoComponent,
    InventariosComponent,
    ElementosComponent,
    ElementoformComponent,
    CrearInventarioComponent,
    BeatyDatePipe,
    LoteComponent,
    FormLotesComponent,
    FormExistenciasComponent
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
