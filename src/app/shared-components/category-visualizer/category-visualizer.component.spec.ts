import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryVisualizerComponent } from './category-visualizer.component';

describe('CategoryVisualizerComponent', () => {
  let component: CategoryVisualizerComponent;
  let fixture: ComponentFixture<CategoryVisualizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoryVisualizerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryVisualizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
