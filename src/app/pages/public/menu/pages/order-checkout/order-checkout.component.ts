import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../menu.service';
import { CheckoutItem } from '../../../../../core/entities/checkout-item';
import { Product } from '../../../../../core/entities/product';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderCheckoutService } from './order-checkout.service';
import { SnackbarService } from '../../../../../core/services/snackbar/snackbar.service';
import { Order } from '../../../../../core/entities/order';

@Component({
  selector: 'app-order-checkout',
  templateUrl: './order-checkout.component.html',
  styleUrl: './order-checkout.component.scss'
})
export class OrderCheckoutComponent implements OnInit {

  uploading: boolean = false;

  cart: Array<Product> = [];
  orderResume: Array<CheckoutItem> = []
  total : number = 0;

  dataForm : FormGroup;
  paymentForm :FormGroup;

  constructor(
    private menuService: MenuService,
    private router: Router,
    private fb: FormBuilder,
    private orderCheckoutService: OrderCheckoutService,
    private snackbar: SnackbarService
  ) {
    this.dataForm = this.fb.group({
      name: ['', [Validators.required]],
      details: ['', []],
    });
    this.paymentForm = this.fb.group({
      type: ['', [Validators.required]],
      debitOrCredit: ['', ],
      phone: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.menuService.cart$.subscribe(cart => {
      this.cart = cart;
      this.buildCheckout();
      this.calculateTotal();
    });
  }

  buildCheckout() {
    this.cart.forEach(product => {
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

  removeItem(index: number) {
    const product = this.orderResume.at(index)!.product;
    this.cart = this.cart.filter(prod => prod.id != product.id);
    this.orderResume = this.orderResume.filter(item => item.product.id != product.id);
    this.menuService.updateCart(this.cart);
    if(this.cart.length == 0)
      this.router.navigate(['/public/menu'])
  }

  cleanCart() {
    this.menuService.cleanCart();
    this.router.navigate(['/public/menu']);
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

  submitOrder() {
    let order : Order = {
      ...this.dataForm.value, 
      ...this.paymentForm.value, 
      items: this.orderResume,
      status: 'PROCESSING',
      active: true,
      date: new Date()
    };
    this.uploading = true;
    const id = this.menuService.menuId!;
    this.orderCheckoutService.createOrder(order, id)
    .then((result) => {
      this.snackbar.openMessage('Orden creada con éxito');
      this.router.navigate(['/public/menu']);
      this.menuService.cleanCart();
    }).catch((err) => {
      this.snackbar.openMessage('Hubo un problema al crear la orden')
    })
    .finally(() => {this.uploading = false});
  }

}
