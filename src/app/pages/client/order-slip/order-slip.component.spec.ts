import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSlipComponent } from './order-slip.component';

describe('OrderSlipComponent', () => {
  let component: OrderSlipComponent;
  let fixture: ComponentFixture<OrderSlipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderSlipComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderSlipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
