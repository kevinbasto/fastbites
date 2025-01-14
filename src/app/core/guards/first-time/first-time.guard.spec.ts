import { TestBed } from '@angular/core/testing';
import { CanActivateChildFn } from '@angular/router';

import { firstTimeGuard } from './first-time.guard';

describe('firstTimeGuard', () => {
  const executeGuard: CanActivateChildFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => firstTimeGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
