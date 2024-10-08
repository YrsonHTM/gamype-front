import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeprotectedComponent } from './components/homeprotected/homeprotected.component';
import { FormEmpresaComponent } from './components/form-empresa/form-empresa.component';
import { PrincipalHomeComponent } from './components/principal-home/principal-home.component';
import { UserSettingsComponent } from './components/user-settings/user-settings.component';

const routes: Routes = [
  {
    path: '',
    component: HomeprotectedComponent,
    children: [
      {
        path: '',
        component: PrincipalHomeComponent
      },
      {
        path: 'create-company',
        component: FormEmpresaComponent,
      },
      {
        path: 'settings',
        component: UserSettingsComponent,
      },
      {
        path: 'edit-company/:id',
        component: FormEmpresaComponent,
      },
      {
        path: 'company',
        loadChildren: () => import('./components/company/company.module').then(m => m.CompanyModule)
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
