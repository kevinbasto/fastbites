import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../../core/entities/product';
import { ProductsRepoService } from '../../../core/repos/products-repo/products-repo.service';

@Injectable({
  providedIn: 'root'
})
export class OrderingMenuService {

  products$: BehaviorSubject<Array<Product>> = new BehaviorSubject<Array<Product>>([]);
  private id?: string;

  constructor(
    private productsRepo : ProductsRepoService
  ) { }

  setMenuId(uid: string) {
    this.id = uid;
    this.productsRepo.fetchProducts(uid)
    .subscribe(products => {
      this.products$.next(products);
    })
  }
}
