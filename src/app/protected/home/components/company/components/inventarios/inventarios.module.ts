import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventariosRoutingModule } from './inventarios-routing.module';
import { RegistrarCompraComponent } from './lote/registrar-compra/registrar-compra.component';

@NgModule({
  imports: [
    CommonModule,
    InventariosRoutingModule
  ],
  declarations: [
  ],
})
export class InventariosModule { }
