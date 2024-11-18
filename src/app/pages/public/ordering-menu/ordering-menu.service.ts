import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../../core/entities/product';
import { ProductsRepoService } from '../../../core/repos/products-repo/products-repo.service';
import { MatDialog } from '@angular/material/dialog';
import { CheckoutComponent } from '../../../shared-components/checkout/checkout.component';
import { CheckoutItem } from '../../../core/entities/checkout-item';
import { Order } from '../../../core/entities/order';
import { OrdersRepoService } from '../../../core/repos/orders-repo/orders-repo.service';
import { SnackbarService } from '../../../core/services/snackbar/snackbar.service';


@Injectable({
  providedIn: 'root'
})
export class OrderingMenuService {

  products$: BehaviorSubject<Array<Product>> = new BehaviorSubject<Array<Product>>([]);
  private uid?: string;

  constructor(
    private productsRepo: ProductsRepoService,
    private ordersRepo: OrdersRepoService,
    private snackbar: SnackbarService,
    private dialog: MatDialog
  ) { }

  setMenuId(uid: string) {
    this.uid = uid;
    this.productsRepo.fetchProducts(uid)
      .subscribe(products => {
        this.products$.next(products);
      })
  }

  loadCheckoutMenu(cart: Array<Product>) {
    return new Promise<null>((resolve, reject) => {
      const dialog = this.dialog.open(CheckoutComponent, { data: { cart } })
      dialog.afterClosed().subscribe((cart: Order | null) => {
        if (!cart)
          return;
        this.ordersRepo.create(cart, this.uid!)
          .then((result) => {
            this.snackbar.openMessage("Orden creada con éxito");
            resolve(null)
          }).catch((err) => {
            this.snackbar.openMessage("No se pudo crear la orden");
          });
      });
    })
  }
}
