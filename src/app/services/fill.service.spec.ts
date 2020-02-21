import { TestBed } from '@angular/core/testing';

import { FillService } from './fill.service';

describe('FillService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FillService = TestBed.get(FillService);
    expect(service).toBeTruthy();
  });
});
