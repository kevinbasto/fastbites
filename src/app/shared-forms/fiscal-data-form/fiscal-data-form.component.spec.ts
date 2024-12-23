import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiscalDataFormComponent } from './fiscal-data-form.component';

describe('FiscalDataFormComponent', () => {
  let component: FiscalDataFormComponent;
  let fixture: ComponentFixture<FiscalDataFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FiscalDataFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiscalDataFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
