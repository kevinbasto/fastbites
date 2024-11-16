import { TestBed } from '@angular/core/testing';

import { ProductsRepoService } from './products-repo.service';

describe('ProductCrudServiceService', () => {
  let service: ProductsRepoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsRepoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
