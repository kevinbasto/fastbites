import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsImporterDialogComponent } from './products-importer-dialog.component';

describe('ProductsImporterDialogComponent', () => {
  let component: ProductsImporterDialogComponent;
  let fixture: ComponentFixture<ProductsImporterDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsImporterDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsImporterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
