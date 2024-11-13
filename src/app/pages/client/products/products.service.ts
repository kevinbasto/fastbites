import { Injectable } from '@angular/core';
import { doc, Firestore, getDoc } from '@angular/fire/firestore';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { Product } from '../../../core/entities/product';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../shared-components/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private firestore : Firestore,
    private authServ: AuthService,
    private router: Router,
    private dialog: MatDialog
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

  createNewProduct() {
    this.router.navigate(['/client/products/create']);
  }

  editProduct(product: Product) {
    window.localStorage.setItem('editProduct', JSON.stringify(product));
    this.router.navigate(['/client/products/edit']);
  }

  deleteProduct(product: Product) {
    console.log(product.uuid);
    const dialog = this.dialog.open(ConfirmDialogComponent, { data: {title: "¿Borrar producto?", message: "Una Vez hecha esta acción, no se puede deshacer"}})
    dialog.afterClosed().subscribe((confirmation : boolean) => {
      if(!confirmation)
        return;
      
      
    });
  }

}
