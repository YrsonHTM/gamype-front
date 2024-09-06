import { Component } from '@angular/core';
import { LoaderService } from './interceptors/loader-service/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'gamype-front';
  loading$ = this.loaderService.getLoading();
  constructor(
    private loaderService: LoaderService
  ) {
  }
}
