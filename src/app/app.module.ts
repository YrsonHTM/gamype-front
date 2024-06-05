import { APP_INITIALIZER, NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeAppFactory } from './prime-ng-modules/configs/ripple.config';
import { PrimeNGConfig } from 'primeng/api';
import { StoreModule } from '@ngrx/store';
import { temaReducer } from './store/tema/tema.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ToggleDarkComponent } from './themes/components/toggle-dark.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ tema: temaReducer}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    BrowserAnimationsModule,
    ToggleDarkComponent,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAppFactory,
      deps: [PrimeNGConfig],
      multi: true,
   },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
