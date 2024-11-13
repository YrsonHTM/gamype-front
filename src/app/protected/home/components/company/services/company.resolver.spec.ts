import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { companyResolver } from './company.resolver';

describe('companyResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => companyResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
