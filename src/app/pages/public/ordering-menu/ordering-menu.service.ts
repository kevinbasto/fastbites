import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../../core/entities/product';
import { ProductsRepoService } from '../../../core/repos/products-repo/products-repo.service';
import { MatDialog } from '@angular/material/dialog';
import { CheckoutComponent } from '../../../shared-components/checkout/checkout.component';


@Injectable({
  providedIn: 'root'
})
export class OrderingMenuService {

  products$: BehaviorSubject<Array<Product>> = new BehaviorSubject<Array<Product>>([]);
  private id?: string;

  constructor(
    private productsRepo : ProductsRepoService,
    private dialog: MatDialog
  ) { }

  setMenuId(uid: string) {
    this.id = uid;
    this.productsRepo.fetchProducts(uid)
    .subscribe(products => {
      this.products$.next(products);
    })
  }

  loadCheckoutMenu(cart: Array<Product>) {
    this.dialog.open(CheckoutComponent, { data: {cart} })
  }
}
