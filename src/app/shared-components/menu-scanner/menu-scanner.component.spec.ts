import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuScannerComponent } from './menu-scanner.component';

describe('MenuScannerComponent', () => {
  let component: MenuScannerComponent;
  let fixture: ComponentFixture<MenuScannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuScannerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuScannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
