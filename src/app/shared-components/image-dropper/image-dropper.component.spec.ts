import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageDropperComponent } from './image-dropper.component';

describe('ImageDropperComponent', () => {
  let component: ImageDropperComponent;
  let fixture: ComponentFixture<ImageDropperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageDropperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageDropperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
