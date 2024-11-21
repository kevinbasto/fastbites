import { Injectable } from '@angular/core';
import { AuthService } from '../../../core/services/auth/auth.service';
import { ProductsRepoService } from '../../../core/repos/products-repo/products-repo.service';
import { Observable } from 'rxjs';
import { Product } from '../../../core/entities/product';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(
    private auth: AuthService,
    private productsRepo: ProductsRepoService
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
}
