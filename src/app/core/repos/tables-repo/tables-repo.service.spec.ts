import { TestBed } from '@angular/core/testing';

import { TablesRepoService } from './tables-repo.service';

describe('TablesRepoService', () => {
  let service: TablesRepoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TablesRepoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
