import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonutComponentComponent } from './donut-component.component';

describe('DonutComponentComponent', () => {
  let component: DonutComponentComponent;
  let fixture: ComponentFixture<DonutComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DonutComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonutComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
