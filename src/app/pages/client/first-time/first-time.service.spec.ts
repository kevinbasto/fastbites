import { TestBed } from '@angular/core/testing';

import { FirstTimeService } from './first-time.service';

describe('FirstTimeService', () => {
  let service: FirstTimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirstTimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
