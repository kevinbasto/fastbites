import { Injectable } from '@angular/core';
import { MenuRepoService } from '../../../core/repos/menu-repo/menu-repo.service';
import { Product } from '../../../core/entities/product';
import { SnackbarService } from '../../../core/services/snackbar/snackbar.service';
import { MatDialog } from '@angular/material/dialog';
import { CheckoutComponent } from '../../../shared-components/checkout/checkout.component';
import { Order } from '../../../core/entities/order';
import { OrdersRepoService } from '../../../core/repos/orders-repo/orders-repo.service';
import { AuthService } from '../../../core/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrderSlipservice {

  constructor(
    private menuRepo: MenuRepoService,
    private snackbar: SnackbarService,
    private ordersRepo: OrdersRepoService,
    private dialog: MatDialog,
    private auth: AuthService
  ) { }

  fetchMenu() {
    return this.menuRepo.ObserveMenu();
  }

  goToCheckout(cart: Product[], ): Promise<any> {
      return new Promise<string>(async (resolve, reject) => {
        const id = await this.auth.getUID();
        if (cart.length == 0) {
          this.snackbar.openMessage("Tu carrito está Vacío");
          return;
        }
        const dialog = this.dialog.open(CheckoutComponent, { data: { cart } });
        dialog.afterClosed().subscribe((order: Order | "DELETE" | null) => {
          if (!order){
            resolve("CANCELED");
            return;
          }
          if (order == "DELETE") {
            this.snackbar.openMessage("Tu carrito ha sido vacíado");
            resolve("DELETE");
          } else {
            this.ordersRepo.create(order, id)
            .then((result) => {
              this.snackbar.openMessage("Orden creada con éxito");
              resolve("COMPLETED");
            }).catch((err) => {
              this.snackbar.openMessage("No se pudo crear la orden");
              reject(err);
            });
          }
        });
      });
    };
}
