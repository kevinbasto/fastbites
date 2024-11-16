import { TestBed } from '@angular/core/testing';

import { SalesRepoService } from './sales-repo.service';

describe('SalesRepoService', () => {
  let service: SalesRepoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalesRepoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
