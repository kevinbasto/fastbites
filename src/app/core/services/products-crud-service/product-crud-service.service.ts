import { Injectable } from '@angular/core';
import { Firestore, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Product } from '../../entities/product';
import { AuthService } from '../auth/auth.service';
import { doc, updateDoc } from '@firebase/firestore';
import { v6 } from "uuid";

@Injectable({
  providedIn: 'root'
})
export class ProductCrudServiceService {

  products$ : Observable<Array<Product>>
  private products?: Array<Product>

  constructor(
    private firestore: Firestore,
    private authService: AuthService
  ) {
    this.products$ = new Observable<Array<Product>>((observer) => {
      this.authService.getUID()
      .then((uid : string | null) => {
        uid = uid as string;
        let docRef = doc(this.firestore, `/users/${uid}/data/products`);
        (docData(docRef) as Observable<{products: Array<Product>}>).subscribe(products => {
          this.products = products.products;
          observer.next(products.products);
        });
      }).catch((err) => {
        observer.error("No se pudo obtener la lista de productos");
      });
    });
  }

  createProduct(product: Product) {
    try {
      
    } catch (error) {
      throw error;
    }
  }

  updateProduct() {}

  deleteProduct() {}

  private async updateProducts() {
    try {
      let uid = await this.authService.getUID() as string;
      let docRef = doc(this.firestore, `/users/${uid}/data/products`);
      await updateDoc(docRef, {products: this.products!})
    } catch (error) {
      throw error;
    }
  }
}
