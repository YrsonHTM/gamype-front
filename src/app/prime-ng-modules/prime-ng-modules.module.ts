import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { PasswordModule } from 'primeng/password';
import { FloatLabelModule } from 'primeng/floatlabel';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule,
    RippleModule,
    ToggleButtonModule,
    InputSwitchModule,
    CardModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    PasswordModule,
    FloatLabelModule
  ],
  exports: [
    ButtonModule,
    RippleModule,
    ToggleButtonModule,
    InputSwitchModule,
    CardModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    PasswordModule,
    FloatLabelModule
  ],
})
export class PrimeNgModulesModule { }
