import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSubmenuComponent } from './view-submenu.component';

describe('ViewSubmenuComponent', () => {
  let component: ViewSubmenuComponent;
  let fixture: ComponentFixture<ViewSubmenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewSubmenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSubmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
