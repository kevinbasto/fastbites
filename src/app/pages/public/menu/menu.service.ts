import { Injectable } from '@angular/core';
import { SnackbarService } from '../../../core/services/snackbar/snackbar.service';
import { ProductsRepoService } from '../../../core/repos/products-repo/products-repo.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../../../core/entities/product';
import { MatDialog } from '@angular/material/dialog';
import { CheckoutComponent } from '../../../shared-components/checkout/checkout.component';
import { OrdersRepoService } from '../../../core/repos/orders-repo/orders-repo.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  
  constructor(
    private snackbar : SnackbarService,
    private productsRepo: ProductsRepoService,
    private dialog : MatDialog,
    private ordersRepo : OrdersRepoService
  ) { }

  fetchMenu(id: string) {
    return new Observable<Array<Product>>((obs) => {
      this.productsRepo.fetchProducts(id)
      .subscribe(products => obs.next(products));
    });
  }

  async processScan(scan: string){
    let {isValidURL, hasQueryParams } = this.isURLWithQueryParams(scan);
    if(!(isValidURL && hasQueryParams)){
      this.snackbar.openMessage("El QR provisto no es valido");
      throw new Error("INVALID QR")
    }
    let paramsRaw = scan.split("?")[1];
    let params : any = {}
    let paramsMap = paramsRaw.split("=");
    let tmp : string = "";
    paramsMap.forEach((value, key) => {
      if(key%2 == 0) tmp = value; else params[tmp] = value; 
    });
    if(!params['id']){
      this.snackbar.openMessage("El QR provisto no es valido");
      throw new Error("INVALID QR")
    }
    let id = params['id'];
    return id;
  }

  isURLWithQueryParams(data: string) {
    const urlRegex =  /^https?:\/\/(localhost|([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,})(:\d+)?(\/[^\s?#]*)?(\?([^#\s]*))?(#.*)?$/;
    const isValidURL = urlRegex.test(data);
    const hasQueryParams = /\?.+=.+/.test(data);
    return {
      isValidURL,
      hasQueryParams,
    };
  }

  goToCheckout(cart: Product[], id : string) : Promise<any> {
    return new Promise<any>((resolve, reject) => {
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


// let {isValidURL, hasQueryParams } = this.isURLWithQueryParams(scan);
//     if(!(isValidURL && hasQueryParams)){
//       this.snackbar.openMessage("El QR provisto no es valido");
//       throw new Error("INVALID QR")
//     }
//     let paramsRaw = scan.split("?")[1];
//     let params : any = {}
//     let paramsMap = paramsRaw.split("=");
//     let tmp : string = "";
//     paramsMap.forEach((value, key) => {
//       if(key%2 == 0) tmp = value; else params[tmp] = value; 
//     });
//     if(!params['id']){
//       this.snackbar.openMessage("El QR provisto no es valido");
//       throw new Error("INVALID QR")
//     }
//     let id = params['id'];
//     return id;