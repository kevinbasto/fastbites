import { Injectable, resolveForwardRef } from '@angular/core';
import { SnackbarService } from '../../../../../core/services/snackbar/snackbar.service';
import { Observable } from 'rxjs';
import { Product } from '../../../../../core/entities/product';
import { MatDialog } from '@angular/material/dialog';
import { CheckoutComponent } from '../../../../../shared-components/checkout/checkout.component';
import { OrdersRepoService } from '../../../../../core/repos/orders-repo/orders-repo.service';
import { Order } from '../../../../../core/entities/order';
import { Menu } from '../../../../../core/entities/menu';
import { doc, docData, Firestore, getDoc } from '@angular/fire/firestore';
import { Personalization } from '../../../../../core/entities/personalization';
import { ProductDetailComponent } from '../.././dialogs/product-detail/product-detail.component';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  constructor(
    private snackbar: SnackbarService,
    private dialog: MatDialog,
    private ordersRepo: OrdersRepoService,
    private firestore: Firestore
  ) { }

  fetchMenu(id: string) {
    return new Observable<Menu>((obs) => {
      let docRef = doc(this.firestore, `/users/${id}/data/menu`);
      (docData(docRef) as Observable<Menu>).subscribe(menu => obs.next(menu));
    });
  }

  fetchPersonalization(id: string) {
    return new Promise<Personalization>((resolve, reject) => {
      let docRef = doc(this.firestore, `/users/${id}/data/personalization`);
      getDoc(docRef)
        .then((result) => {
          resolve(result.data() as Personalization);
        }).catch((err) => {
          reject(err);
        });
    });
  }

  async processScan(scan: string) {
    let { isValidURL, hasQueryParams } = this.isURLWithQueryParams(scan);
    if (!(isValidURL && hasQueryParams)) {
      this.snackbar.openMessage("El QR provisto no es valido");
      throw new Error("INVALID QR")
    }
    let paramsRaw = scan.split("?")[1];
    let params: any = {}
    let paramsMap = paramsRaw.split("=");
    let tmp: string = "";
    paramsMap.forEach((value, key) => {
      if (key % 2 == 0) tmp = value; else params[tmp] = value;
    });
    if (!params['id']) {
      this.snackbar.openMessage("El QR provisto no es valido");
      throw new Error("INVALID QR")
    }
    let id = params['id'];
    return id;
  }

  isURLWithQueryParams(data: string) {
    const urlRegex = /^https?:\/\/(localhost|([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,})(:\d+)?(\/[^\s?#]*)?(\?([^#\s]*))?(#.*)?$/;
    const isValidURL = urlRegex.test(data);
    const hasQueryParams = /\?.+=.+/.test(data);
    return {
      isValidURL,
      hasQueryParams,
    };
  }

  goToCheckout(cart: Product[], id: string): Promise<any> {
    return new Promise<string>((resolve, reject) => {
      if (cart.length == 0) {
        this.snackbar.openMessage("Tu carrito está Vacío");
        return;
      }
      const dialog = this.dialog.open(CheckoutComponent, { data: { cart } });
      dialog.afterClosed().subscribe((order: Order | "DELETE" | null) => {
        if (!order) {
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
  }

  checkProductDetail(product: Product): Promise<{ product: Product, quantity: number } | null> {
    return new Promise<{product: Product, quantity: number } | null>((resolve, reject) => {
      const dialog = this.dialog.open(ProductDetailComponent, { data: { product } });
      dialog.afterClosed().subscribe((result: { product: Product, quantity: number }) => {
        if (result) resolve(result);
        else resolve(null)
      });
    });
  }
}
