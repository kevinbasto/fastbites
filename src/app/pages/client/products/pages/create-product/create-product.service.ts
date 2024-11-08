import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { AuthService } from '../../../../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { Product } from '../../../../../core/entities/product';
import { SnackbarService } from '../../../../../core/services/snackbar/snackbar.service';

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
      let uid = await this.auth.getUID();
    } catch (error) {
      
    }
  }
}
