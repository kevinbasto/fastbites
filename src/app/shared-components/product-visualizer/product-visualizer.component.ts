import { Component, Inject, } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from '../../core/entities/product';

@Component({
  selector: 'app-product-visualizer',
  templateUrl: './product-visualizer.component.html',
  styleUrl: './product-visualizer.component.scss'
})
export class ProductVisualizerComponent {

  product: Product;
  imageload: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: {product : Product},
    public dialogRef: MatDialogRef<ProductVisualizerComponent>,
  ) {
    this.product = data.product
  }
}
