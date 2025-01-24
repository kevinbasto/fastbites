import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from '../../core/entities/product';
import { CheckoutItem } from '../../core/entities/checkout-item';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Order } from '../../core/entities/order';


@Component({
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {

  orderResume: Array<CheckoutItem> = []
  total : number = 0;

  form: FormGroup
  private formattingPhone = false; 

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { cart: Array<Product>},
    private dialogRef: MatDialogRef<CheckoutComponent>,
    private builder: FormBuilder
  ) {
    this.form = this.builder.group({
      name: ["", [Validators.required]],
      details: [""],
      type: ["", [Validators.required]],
      creditOrDebit: [''],
      phone: ['', [Validators.required]]
    });
    this.form.get("type")?.valueChanges.subscribe(change => {
      
    });
  }

  ngOnInit(): void {
    this.buildCheckout()
    this.phone.valueChanges.subscribe((phone: string) => {
      if (!this.formattingPhone) {
        this.formattingPhone = true;
        const formattedPhone = this.formatPhone(phone);
        this.phone.setValue(formattedPhone, { emitEvent: false }); // Evita disparar valueChanges de nuevo
        this.formattingPhone = false;
      }
    });
  }

  cancel() {
    this.dialogRef.close(null);
  }

  buildCheckout() {
    this.data.cart.forEach(product => {
      const existingItem = this.orderResume.find(item => item.product.id === product.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        this.orderResume.push({ product, quantity: 1 });
      }
    });
  
    this.calculateTotal()
  }

  calculateTotal() {
    this.total = 0;
    for(let item of this.orderResume){
      this.total += item.quantity * item.product.price!;
    }
  }

  addItem(index: number) {
    this.orderResume[index].quantity++
    this.calculateTotal();
  }

  substractItem(index: number) {
    if (this.orderResume[index].quantity - 1 >= 0) {
        this.orderResume[index].quantity--;
    }
    if (this.orderResume[index].quantity === 0) {
        this.orderResume.splice(index, 1);
    }
    this.calculateTotal();
  }

  confirmOrder() {
    let order: Order = {
      items: this.orderResume,
      date: new Date(),
      active: true,
      status: 'PROCESSING',
      name: this.form.value.name,
      details: this.form.value.details,
      total: this.total,
      phone: this.form.value.phone,
      type: '',
      debitOrCredit: ''
    }
    this.dialogRef.close(order);
  }

  clearCart(){
    this.dialogRef.close("DELETE")
  }

  get phone() {
    return this.form.get("phone")!;
  }

  private formatPhone(phone: string): string {
    // Lógica de formateo (ejemplo: formato internacional +1 (123) 456-7890)
    const digits = phone.replace(/\D/g, ''); // Remover caracteres no numéricos
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
  }
}
