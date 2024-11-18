import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderVisualizerComponent } from './order-visualizer.component';

describe('OrderVisualizerComponent', () => {
  let component: OrderVisualizerComponent;
  let fixture: ComponentFixture<OrderVisualizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderVisualizerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderVisualizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
