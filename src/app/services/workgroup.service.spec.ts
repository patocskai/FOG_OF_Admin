import { TestBed } from '@angular/core/testing';

import { WorkgroupService } from './workgroup.service';

describe('WorkgroupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorkgroupService = TestBed.get(WorkgroupService);
    expect(service).toBeTruthy();
  });
});
