import { TestBed } from '@angular/core/testing';

import { OrderingMenuService } from './ordering-menu.service';

describe('OrderingMenuService', () => {
  let service: OrderingMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderingMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
