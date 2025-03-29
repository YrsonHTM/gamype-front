import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoteOperacionFormComponent } from './lote-operacion-form.component';

describe('LoteOperacionFormComponent', () => {
  let component: LoteOperacionFormComponent;
  let fixture: ComponentFixture<LoteOperacionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoteOperacionFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoteOperacionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
