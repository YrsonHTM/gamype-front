import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoaderService } from './interceptors/loader-service/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'gamype-front';
  loading = false;
  constructor(
    private loaderService: LoaderService,
    private cdr: ChangeDetectorRef
  ) {
    
  }
  ngOnInit() {
    this.loaderService.getLoading().subscribe((loading) => {
      this.loading = loading;
      this.cdr.detectChanges(); // Manually trigger change detection
    });
  }
}
