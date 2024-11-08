import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventariosComponent } from './inventarios.component';
import { LoteComponent } from './lote/lote.component';
import { canDeactivateGuard } from './guards/canLeaveLoteRoute';

const routes: Routes = [
  {
    path: '',
    component: InventariosComponent
  },
  {
    path: 'lote',
    component: LoteComponent,
    canDeactivate: [canDeactivateGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventariosRoutingModule {

}
