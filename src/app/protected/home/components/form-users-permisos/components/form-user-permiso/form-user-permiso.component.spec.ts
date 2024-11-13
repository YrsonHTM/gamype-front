import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUserPermisoComponent } from './form-user-permiso.component';

describe('FormUserPermisoComponent', () => {
  let component: FormUserPermisoComponent;
  let fixture: ComponentFixture<FormUserPermisoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormUserPermisoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormUserPermisoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
