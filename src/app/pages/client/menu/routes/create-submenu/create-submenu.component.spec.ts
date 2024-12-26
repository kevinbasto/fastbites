import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSubmenuComponent } from './create-submenu.component';

describe('CreateSubmenuComponent', () => {
  let component: CreateSubmenuComponent;
  let fixture: ComponentFixture<CreateSubmenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateSubmenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateSubmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
