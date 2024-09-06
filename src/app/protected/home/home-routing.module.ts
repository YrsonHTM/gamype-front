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
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
