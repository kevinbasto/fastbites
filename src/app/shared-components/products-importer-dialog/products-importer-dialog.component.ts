import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-products-importer-dialog',
  templateUrl: './products-importer-dialog.component.html',
  styleUrl: './products-importer-dialog.component.scss'
})
export class ProductsImporterDialogComponent {

  file?: File

  constructor(
    public dialogRef : MatDialogRef<ProductsImporterDialogComponent>
  ) {}

  uploadFile(file: File) {
    this.file = file;
  }
}
