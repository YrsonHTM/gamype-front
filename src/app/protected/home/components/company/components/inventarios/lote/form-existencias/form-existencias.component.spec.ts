import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormExistenciasComponent } from './form-existencias.component';

describe('FormExistenciasComponent', () => {
  let component: FormExistenciasComponent;
  let fixture: ComponentFixture<FormExistenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormExistenciasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormExistenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
