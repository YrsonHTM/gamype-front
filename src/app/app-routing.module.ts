import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { loginGuard } from './guards/login.guard';

const routes: Routes = [
  {
  path: '',
  loadChildren: () => import('./gamype/gamype.module').then(m => m.GamypeModule)
  },
  {
  path: 'gamype',
  loadChildren: () => import('./protected/protected.module').then(m => m.ProtectedModule),
  canActivate: [loginGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
