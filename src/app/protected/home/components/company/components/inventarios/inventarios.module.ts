import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventariosRoutingModule } from './inventarios-routing.module';
import { FormExistenciasComponent } from './lote/form-existencias/form-existencias.component';


@NgModule({
  imports: [
    CommonModule,
    InventariosRoutingModule
  ],
})
export class InventariosModule { }
