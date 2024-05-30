import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GamypeRoutingModule } from './gamype-routing.module';
import { PrimeNgModulesModule } from '../prime-ng-modules/prime-ng-modules.module';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ToggleDarkComponent } from '../themes/components/toggle-dark.component';
import { HeaderComponent } from './components/header/header.component';
import { CardsComponent } from './components/cards/cards.component';
import { FooterComponent } from './components/footer/footer.component';


@NgModule({
  declarations: [
    HomePageComponent,
    HeaderComponent,
    CardsComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    GamypeRoutingModule,
    PrimeNgModulesModule,
    ToggleDarkComponent,
  ]
})
export class GamypeModule { }
