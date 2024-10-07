import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserPermisoComponent } from './edit-user-permiso.component';

describe('EditUserPermisoComponent', () => {
  let component: EditUserPermisoComponent;
  let fixture: ComponentFixture<EditUserPermisoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditUserPermisoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditUserPermisoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
