import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeprotectedComponent } from './components/homeprotected/homeprotected.component';


@NgModule({
  declarations: [
    HomeprotectedComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
