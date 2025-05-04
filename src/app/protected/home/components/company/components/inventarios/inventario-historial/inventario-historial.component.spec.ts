import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarioHistorialComponent } from './inventario-historial.component';

describe('InventarioHistorialComponent', () => {
  let component: InventarioHistorialComponent;
  let fixture: ComponentFixture<InventarioHistorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InventarioHistorialComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InventarioHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
