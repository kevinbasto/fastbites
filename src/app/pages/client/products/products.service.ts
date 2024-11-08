import { Injectable } from '@angular/core';
import { doc, Firestore, getDoc } from '@angular/fire/firestore';
import { AuthService } from '../../../core/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private firestore : Firestore,
    private authServ: AuthService
  ) {}

  async fetchProducts() : Promise<Array<any>> {
    try {
      let uid  = await this.authServ.getUID();
      let docRef = doc(this.firestore, `/users/${uid}/data/products`);
      let products = (await getDoc(docRef)).data()
      return products as any? (products as any).products : [];
    } catch (error) {
      throw error;
    }
  }

}
