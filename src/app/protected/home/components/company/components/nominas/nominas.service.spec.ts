import { TestBed } from '@angular/core/testing';

import { NominasService } from './nominas.service';

describe('NominasService', () => {
  let service: NominasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NominasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
