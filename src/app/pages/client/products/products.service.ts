import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private firestore : Firestore,
    private auth: Auth
  ) {
    this.auth.onAuthStateChanged(change => {
      console.log(change?.uid);
    })
  }

  searchProduct() {}
}
