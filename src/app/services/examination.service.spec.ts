import { TestBed } from '@angular/core/testing';

import { ExaminationService } from './examination.service';

describe('ExaminationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExaminationService = TestBed.get(ExaminationService);
    expect(service).toBeTruthy();
  });
});
