import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNominaComponent } from './form-nomina.component';

describe('FormNominaComponent', () => {
  let component: FormNominaComponent;
  let fixture: ComponentFixture<FormNominaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormNominaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormNominaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
