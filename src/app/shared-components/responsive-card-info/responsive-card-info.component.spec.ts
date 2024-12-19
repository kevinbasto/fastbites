import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsiveCardInfoComponent } from './responsive-card-info.component';

describe('ResponsiveCardInfoComponent', () => {
  let component: ResponsiveCardInfoComponent;
  let fixture: ComponentFixture<ResponsiveCardInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResponsiveCardInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResponsiveCardInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
