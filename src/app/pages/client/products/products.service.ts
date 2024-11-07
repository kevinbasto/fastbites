import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { AuthService } from '../../../core/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  uid! : string;

  constructor(
    private firestore : Firestore,
    private auth: AuthService
  ) {
    this.setup()
  }

  setup() {
    this.auth.getUid()
    .then((result) => this.uid = result)
    .catch((err) => {throw new Error("No se pudo cargar el user Id")});
  }
}
