import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { AuthService } from '../../../../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CreateProductService {

  constructor(
    private firestore: Firestore,
    private auth: AuthService,
    private router : Router
  ) { }

  goBack(){
    this.router.navigate([`/client/products`]);
  }

  createProduct() {}
}
