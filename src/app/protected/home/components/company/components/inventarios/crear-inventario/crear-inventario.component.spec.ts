import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearInventarioComponent } from './crear-inventario.component';

describe('CrearInventarioComponent', () => {
  let component: CrearInventarioComponent;
  let fixture: ComponentFixture<CrearInventarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrearInventarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
