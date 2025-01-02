import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanSelectorFormComponent } from './plan-selector-form.component';

describe('PlanSelectorFormComponent', () => {
  let component: PlanSelectorFormComponent;
  let fixture: ComponentFixture<PlanSelectorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlanSelectorFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanSelectorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
