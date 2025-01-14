import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizeQrComponent } from './visualize-qr.component';

describe('VisualizeQrComponent', () => {
  let component: VisualizeQrComponent;
  let fixture: ComponentFixture<VisualizeQrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VisualizeQrComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualizeQrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
