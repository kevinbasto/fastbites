import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizeTableComponent } from './visualize-table.component';

describe('VisualizeTableComponent', () => {
  let component: VisualizeTableComponent;
  let fixture: ComponentFixture<VisualizeTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualizeTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualizeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
