import { Injectable } from '@angular/core';
import { Firestore, doc, getDoc, setDoc, updateDoc } from '@angular/fire/firestore';
import { AuthService } from '../../../../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { Product } from '../../../../../core/entities/product';
import { SnackbarService } from '../../../../../core/services/snackbar/snackbar.service';
import { v6 as uuid } from "uuid";

@Injectable({
  providedIn: 'root'
})
export class CreateProductService {

  constructor(
    private firestore: Firestore,
    private auth: AuthService,
    private router : Router,
    private snackbar: SnackbarService
  ) { }

  goBack(){
    this.router.navigate([`/client/products`]);
  }

  async createProduct(product: Product) {
    try {
      product.uuid = uuid();
      let uid = await this.auth.getUID();
      let docRef = doc(this.firestore, `/users/${uid}/data/products`);
      let raw = ((await getDoc(docRef)).data() as  {products : Array<Product>});
      let products: Array<Product> = raw? raw.products : []
      products = products? [...products, product] : [product];
      await setDoc(docRef, {products});
      this.snackbar.openMessage("Producto creada con éxito");
      this.router.navigate(["/client/products"]);
    } catch (error) {
      console.error(error);
      this.snackbar.openMessage("No se pudo crear el producto");
    }
  }
}
