import { TestBed } from '@angular/core/testing';

import { CategoriesRepoService } from '../categories-repo/categories-repo.service';

describe('CategoriesRepoService', () => {
  let service: CategoriesRepoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriesRepoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
