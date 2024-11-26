import { Injectable } from '@angular/core';
import { AuthService } from '../../../core/services/auth/auth.service';
import { ProductsRepoService } from '../../../core/repos/products-repo/products-repo.service';
import { Observable } from 'rxjs';
import { Product } from '../../../core/entities/product';
import { MatDialog } from '@angular/material/dialog';
import { CheckoutComponent } from '../../../shared-components/checkout/checkout.component';
import { OrdersRepoService } from '../../../core/repos/orders-repo/orders-repo.service';
import { SnackbarService } from '../../../core/services/snackbar/snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(
    private auth: AuthService,
    private productsRepo: ProductsRepoService,
    private dialog : MatDialog,
    private ordersRepo: OrdersRepoService,
    private snackbar: SnackbarService
  ) { }

  fetchProducts() {
    return new Observable<Array<Product>>((obs) => {
      this.auth.getUID()
      .then((uid) => {
        this.productsRepo.fetchProducts(uid!)
        .subscribe(products => {
          if(!products)            
            obs.next([])
          else
            obs.next(products)
        })
      }).catch((err) => {
        obs.error("error")
      });
    });
  }

  goToCheckout(cart: Product[], id : string) : Promise<any> {
    return new Promise<any>((resolve, reject) => {
      if(cart.length == 0){
        this.snackbar.openMessage("Tu carrito está Vacío");
        return;
      }
      const dialog = this.dialog.open(CheckoutComponent, {data: {cart} });
      dialog.afterClosed().subscribe(order => {
        if(!order)
          return;
        this.ordersRepo.create(order, id)
        .then((result) => {
          this.snackbar.openMessage("Orden creada con éxito");
          resolve(null);
        }).catch((err) => {
          this.snackbar.openMessage("No se pudo crear la orden");
          reject(err);
        });
      });
    });
  }
}
