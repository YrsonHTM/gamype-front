import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PrimeNgModulesModule } from '../prime-ng-modules/prime-ng-modules.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectComponent } from '../layout/transversal-components/select/select.component';
import { AutoErrorsDirective } from '../directives/auto-errors.directive';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    PrimeNgModulesModule,
    ReactiveFormsModule,
    FormsModule,
    SelectComponent,
    AutoErrorsDirective
  ]
})
export class AuthModule { }
