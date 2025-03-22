import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { DashBoardComponent } from './components/dash-board/dash-board.component';
import { RolesComponent } from './components/roles/roles.component';
import { companyResolver } from './services/company.resolver';
import { PersonalComponent } from './components/personal/personal.component';
import { InventariosComponent } from './components/inventarios/inventarios.component';
import { ElementosComponent } from './components/elementos/elementos.component';
import { TareasComponent } from './components/tareas/tareas.component';
import { NominasComponent } from './components/nominas/nominas.component';

const routes: Routes = [
  {
  path: '',
  component: LayoutComponent,
  resolve: { company: companyResolver },
  children: [
    {
      path: 'dashboard',
      component: DashBoardComponent,
    },
    {
      path: 'cargo',
      component: RolesComponent,
    },
    {
      path: 'personal',
      component: PersonalComponent,
    },
    {
      path: 'inventarios',
      loadChildren: () => import('./components/inventarios/inventarios.module').then(m => m.InventariosModule),
    },
    {
      path: 'tareas',
      component: TareasComponent,
    },
    {
      path: 'elemento',
      component: ElementosComponent,
    },
    {
      path: 'nominas',
      component: NominasComponent,
    }
  ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
