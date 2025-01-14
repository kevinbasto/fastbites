import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmenuFormComponent } from './submenu-form.component';

describe('SubmenuFormComponent', () => {
  let component: SubmenuFormComponent;
  let fixture: ComponentFixture<SubmenuFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubmenuFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmenuFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
