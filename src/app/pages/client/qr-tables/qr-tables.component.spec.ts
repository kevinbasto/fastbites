import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrTablesComponent } from './qr-tables.component';

describe('QrTablesComponent', () => {
  let component: QrTablesComponent;
  let fixture: ComponentFixture<QrTablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QrTablesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QrTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
