import { Injectable } from '@angular/core';
import { Firestore, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Product } from '../../entities/product';
import { AuthService } from '../../services/auth/auth.service';
import { collection, doc, getDoc, limitToLast, query, setDoc, updateDoc } from '@firebase/firestore';
import { v6 } from "uuid";

@Injectable({
  providedIn: 'root'
})
export class ProductsRepoService {

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
        (docData(docRef) as Observable<{products: Array<Product>}>).subscribe((products) => {
          if(!products){
            observer.next([])
            return;
          }
          this.products = products.products;
          observer.next(products.products);
        });
      }).catch((err) => {
        observer.error("No se pudo obtener la lista de productos");
      });
    });
  }

  async createProduct(product: Product) {
    try {
      let uid = await this.authService.getUID();
      let docRef = doc(this.firestore, `/users/${uid}/data/products`);
      let menu : any = (await getDoc(docRef)).data();
      if(!menu)
        menu = {products: [product]}
      else
        menu.products.push(product);
      await setDoc(docRef, menu);
    } catch (error) {
      throw error;
    }
  }

  async updateProduct(product: Product, uid: string, uuid: string) {
    try {
      this.products = this.products!.map(prod => {
        if(prod.uuid == uuid)
          return {...prod, ...product};
        return prod;
      });
      await this.updateProducts();
    } catch (error) {
      throw error;
    }
  }

  async deleteProduct(product: Product) {
    try {
      this.products = this.products!.filter(prod => prod.uuid != product.uuid);
      await this.updateProducts();
    } catch (error) {
      throw error;
    }
  }

  private async updateProducts() {
    try {
      let uid = await this.authService.getUID() as string;
      let docRef = doc(this.firestore, `/users/${uid}/data/products`);
      await updateDoc(docRef, {products: this.products!})
    } catch (error) {
      throw error;
    }
  }

  fetchProducts(uid: string) {
    return new Observable<Array<Product>>((observer) => {
      let docRef = doc(this.firestore, `/users/${uid}/data/products`);
      (docData(docRef) as Observable<{products: Array<Product>}>).subscribe(doc => {
        if(!doc)
          observer.next([]);
        else
          observer.next(doc.products);
      });
    });
  }

  async fetchPage() {
    let colRef = collection(this.firestore, 'users/data');
    let queryRef = query(colRef, limitToLast(5))
  }

  
  // async createProduct(product: Product) {}

  // async updateProduct(product: Product) {}

  // async deleteProduct(product: Product) {}

}
