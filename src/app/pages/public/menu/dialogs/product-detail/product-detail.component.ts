import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from '../../../../../core/entities/product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
,
  standalone: false})
export class ProductDetailComponent {

  product: Product;
  quantity: number = 0;

  constructor(
    private dialogref: MatDialogRef<ProductDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { product: Product },
  ) {
    this.product = data.product;
  }

  close() { this.dialogref.close(); }

  addtoCart() {
    this.dialogref.close({ product: this.product, quantity: this.quantity });
  }
}
