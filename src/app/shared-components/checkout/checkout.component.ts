import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from '../../core/entities/product';
import { CheckoutItem } from '../../core/entities/checkout-item';


@Component({
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {

  orderResume: Array<CheckoutItem> = []
  total : number = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { cart: Array<Product>},
    private dialogRef: MatDialogRef<CheckoutComponent>
  ) {}

  ngOnInit(): void {
    this.buildCheckout()
  }

  cancel() {
    this.dialogRef.close(null);
  }

  buildCheckout() {
    this.data.cart.forEach(product => {
      const existingItem = this.orderResume.find(item => item.product.uuid === product.uuid);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        this.orderResume.push({ product, quantity: 1 });
      }
    });
  
    for(let item of this.orderResume){
      this.total += item.quantity * item.product.price;
    }
  }
}
