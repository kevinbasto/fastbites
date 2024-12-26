import { TestBed } from '@angular/core/testing';

import { OrderSlipservice } from './order-slip.service';

describe('OrderSlip', () => {
  let service: OrderSlipservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderSlipservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
