import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductVisualizerComponent } from './product-visualizer.component';

describe('ProductVisualizerComponent', () => {
  let component: ProductVisualizerComponent;
  let fixture: ComponentFixture<ProductVisualizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductVisualizerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductVisualizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
