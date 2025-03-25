import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteVacacionesComponent } from './reporte-vacaciones.component';

describe('ReporteVacacionesComponent', () => {
  let component: ReporteVacacionesComponent;
  let fixture: ComponentFixture<ReporteVacacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReporteVacacionesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReporteVacacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
