import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportePrimaComponent } from './reporte-prima.component';

describe('ReportePrimaComponent', () => {
  let component: ReportePrimaComponent;
  let fixture: ComponentFixture<ReportePrimaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReportePrimaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReportePrimaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
