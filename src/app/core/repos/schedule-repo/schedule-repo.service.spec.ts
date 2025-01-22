import { TestBed } from '@angular/core/testing';

import { ScheduleRepoService } from './schedule-repo.service';

describe('ScheduleRepoService', () => {
  let service: ScheduleRepoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScheduleRepoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
