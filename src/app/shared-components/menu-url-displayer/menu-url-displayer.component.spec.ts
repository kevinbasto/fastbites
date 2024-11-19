import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuUrlDisplayerComponent } from './menu-url-displayer.component';

describe('MenuUrlDisplayerComponent', () => {
  let component: MenuUrlDisplayerComponent;
  let fixture: ComponentFixture<MenuUrlDisplayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuUrlDisplayerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuUrlDisplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
