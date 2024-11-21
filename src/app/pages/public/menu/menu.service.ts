import { Injectable } from '@angular/core';
import { SnackbarService } from '../../../core/services/snackbar/snackbar.service';
import { ProductsRepoService } from '../../../core/repos/products-repo/products-repo.service';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../../core/entities/product';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  products$ : BehaviorSubject<Array<Product>> = new BehaviorSubject<Array<Product>>(null as any);
  
  constructor(
    private snackbar : SnackbarService,
    private productsRepo: ProductsRepoService
  ) { }

  async fetchMenu(id: string) {
    try {
      this.productsRepo.fetchProducts(id)
      .subscribe((products : Array<Product>) => {
        this.products$.next(products);
      });
    } catch (error) {
      throw error;
    }
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
}
