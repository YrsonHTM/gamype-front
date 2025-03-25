import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteCesantiasComponent } from './reporte-cesantias.component';

describe('ReporteCesantiasComponent', () => {
  let component: ReporteCesantiasComponent;
  let fixture: ComponentFixture<ReporteCesantiasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReporteCesantiasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReporteCesantiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
