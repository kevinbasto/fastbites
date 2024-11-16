import { TestBed } from '@angular/core/testing';

import { OrdersRepoService } from './orders-repo.service';

describe('OrdersRepoService', () => {
  let service: OrdersRepoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrdersRepoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
