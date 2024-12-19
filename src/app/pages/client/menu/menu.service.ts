import { Injectable } from '@angular/core';
import { AuthService } from '../../../core/services/auth/auth.service';
import { ProductsRepoService } from '../../../core/repos/products-repo/products-repo.service';
import { Observable } from 'rxjs';
import { Product } from '../../../core/entities/product';
import { MatDialog } from '@angular/material/dialog';
import { CheckoutComponent } from '../../../shared-components/checkout/checkout.component';
import { OrdersRepoService } from '../../../core/repos/orders-repo/orders-repo.service';
import { SnackbarService } from '../../../core/services/snackbar/snackbar.service';
import { Order } from '../../../core/entities/order';
import { MenuRepoService } from '../../../core/repos/menu-repo/menu-repo.service';
import { doc, docData, docSnapshots, Firestore } from '@angular/fire/firestore';
import { Menu } from '../../../core/entities/menu';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(
    private auth: AuthService,
    private menuRepo: MenuRepoService,
    private dialog: MatDialog,
    private ordersRepo: OrdersRepoService,
    private snackbar: SnackbarService,
    private firestore: Firestore
  ) { }

  fetchProducts() {
    return new Observable<Menu>((obs) => {
      this.auth.getUID()
      .then((uid : string) => {
        let docRef = doc(this.firestore, `/users/${uid}/data/menu`);
        (docData(docRef) as Observable<Menu>).subscribe(menu => obs.next(menu));
      })
      .catch((err) => obs.error(err));
    });
  }

  goToCheckout(cart: Product[], id: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      if (cart.length == 0) {
        this.snackbar.openMessage("Tu carrito está Vacío");
        return;
      }
      const dialog = this.dialog.open(CheckoutComponent, { data: { cart } });
      dialog.afterClosed().subscribe((order: Order | "DELETE" | null) => {
        if (!order)
          return;
        if (order == "DELETE") {
          resolve(null)
        } else {
          this.ordersRepo.create(order, id)
            .then((result) => {
              this.snackbar.openMessage("Orden creada con éxito");
              resolve(null);
            }).catch((err) => {
              this.snackbar.openMessage("No se pudo crear la orden");
              reject(err);
            });
        }

      });
    });
  }
}
