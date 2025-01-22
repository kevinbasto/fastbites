import { TestBed } from '@angular/core/testing';

import { EditScheduleService } from './edit-schedule.service';

describe('EditScheduleService', () => {
  let service: EditScheduleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditScheduleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
