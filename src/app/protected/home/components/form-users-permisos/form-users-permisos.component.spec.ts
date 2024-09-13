import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUsersPermisosComponent } from './form-users-permisos.component';

describe('FormUsersPermisosComponent', () => {
  let component: FormUsersPermisosComponent;
  let fixture: ComponentFixture<FormUsersPermisosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormUsersPermisosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormUsersPermisosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
