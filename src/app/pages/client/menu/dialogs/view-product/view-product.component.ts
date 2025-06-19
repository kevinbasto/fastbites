import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from '../../../../../core/entities/product';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrl: './view-product.component.scss'
,
  standalone: false})
export class ViewProductComponent {

  product: Product;

  constructor(
      @Inject(MAT_DIALOG_DATA) data: { product: Product },
      public dialogRef: MatDialogRef<ViewProductComponent>,
    ) {
      this.product = data.product;
    }
}
