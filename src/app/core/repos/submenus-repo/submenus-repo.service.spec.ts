import { TestBed } from '@angular/core/testing';

import { SubmenusRepoService } from './submenus-repo.service';

describe('SubmenusRepoService', () => {
  let service: SubmenusRepoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubmenusRepoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
