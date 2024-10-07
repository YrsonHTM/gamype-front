import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { DashBoardComponent } from './components/dash-board/dash-board.component';
import { RolesComponent } from './components/roles/roles.component';
import { companyResolver } from './services/company.resolver';
import { PersonalComponent } from './components/personal/personal.component';

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
    }
  ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
