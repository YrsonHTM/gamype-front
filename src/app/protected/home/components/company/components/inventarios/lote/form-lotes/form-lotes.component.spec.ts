import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLotesComponent } from './form-lotes.component';

describe('FormLotesComponent', () => {
  let component: FormLotesComponent;
  let fixture: ComponentFixture<FormLotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormLotesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormLotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
