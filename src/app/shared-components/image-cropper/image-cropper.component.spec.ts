import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppImageCropperComponent } from './image-cropper.component';

describe('ImageCropperComponent', () => {
  let component: AppImageCropperComponent;
  let fixture: ComponentFixture<AppImageCropperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppImageCropperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppImageCropperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
