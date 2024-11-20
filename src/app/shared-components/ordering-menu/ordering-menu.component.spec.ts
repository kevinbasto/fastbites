import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderingMenuComponent } from './ordering-menu.component';

describe('OrderingMenuComponent', () => {
  let component: OrderingMenuComponent;
  let fixture: ComponentFixture<OrderingMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderingMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderingMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
