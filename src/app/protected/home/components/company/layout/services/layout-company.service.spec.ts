import { TestBed } from '@angular/core/testing';

import { LayoutCompanyService } from './layout-company.service';

describe('LayoutCompanyService', () => {
  let service: LayoutCompanyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LayoutCompanyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
