import { TestBed } from '@angular/core/testing';

import { ProductCrudServiceService } from './product-crud-service.service';

describe('ProductCrudServiceService', () => {
  let service: ProductCrudServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductCrudServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
