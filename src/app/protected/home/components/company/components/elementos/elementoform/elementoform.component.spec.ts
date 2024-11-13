import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementoformComponent } from './elementoform.component';

describe('ElementoformComponent', () => {
  let component: ElementoformComponent;
  let fixture: ComponentFixture<ElementoformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ElementoformComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ElementoformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
