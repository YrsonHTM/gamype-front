import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeprotectedComponent } from './homeprotected.component';

describe('HomeprotectedComponent', () => {
  let component: HomeprotectedComponent;
  let fixture: ComponentFixture<HomeprotectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeprotectedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeprotectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
