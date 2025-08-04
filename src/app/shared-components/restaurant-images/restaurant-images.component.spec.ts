import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantImagesComponent } from './restaurant-images.component';

describe('RestaurantImagesComponent', () => {
  let component: RestaurantImagesComponent;
  let fixture: ComponentFixture<RestaurantImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RestaurantImagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
