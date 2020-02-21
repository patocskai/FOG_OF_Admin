import { TestBed } from '@angular/core/testing';

import { PractitionerService } from './practitioner.service';

describe('PractitionerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PractitionerService = TestBed.get(PractitionerService);
    expect(service).toBeTruthy();
  });
});
