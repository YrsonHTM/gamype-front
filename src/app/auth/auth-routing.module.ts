import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { loginGuard } from '../guards/login.guard';

const routes: Routes = [{
  path: 'login',
  component: LoginComponent
  }, {
  path: 'register',
  component: RegisterComponent
}, {
  path: '**',
  redirectTo: 'login',
  // canActivate: [loginGuard]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
