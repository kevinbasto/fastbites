import { Injectable } from '@angular/core';
import { doc, docData, Firestore, getDoc, setDoc } from '@angular/fire/firestore';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { Product } from '../../../core/entities/product';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../shared-components/confirm-dialog/confirm-dialog.component';
import { Observable } from 'rxjs';
import { deleteObject, list, ref, Storage } from '@angular/fire/storage';
import { SnackbarService } from '../../../core/services/snackbar/snackbar.service';
import { ProductsRepoService } from '../../../core/repos/products-repo/products-repo.service';
import * as qrcode from "qrcode";
import { MenuUrlDisplayerComponent } from '../../../shared-components/menu-url-displayer/menu-url-displayer.component';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  products$ : Observable<Array<Product>> = new Observable<Array<Product>>((observer ) => {
    this.productsService.products$.subscribe(prods => {
      if(prods)
        observer.next(prods)
      else
        observer.next([])
    });
  });

  constructor(
    private firestore : Firestore,
    private authServ: AuthService,
    private storage: Storage,
    private router: Router,
    private dialog: MatDialog,
    private snackbar: SnackbarService,
    private productsService: ProductsRepoService,
  ) { }

  createNewProduct() {
    this.router.navigate(['/client/products/create']);
  }

  editProduct(product: Product) {
    window.localStorage.setItem('editProduct', JSON.stringify(product));
    this.router.navigate(['/client/products/edit']);
  }

  async deleteProduct(product: Product, products: Array<Product>) {
    let { uuid } = product;
    let uid = await this.authServ.getUID();
    
    const dialog = this.dialog.open(ConfirmDialogComponent, { data: {name: "¿Borrar producto?", message: "Una Vez hecha esta acción, no se puede deshacer"}})
    dialog.afterClosed().subscribe(async (confirmation : boolean) => {
      if(!confirmation)
        return;
      products = products.filter(prod => prod.uuid != product.uuid);
      let uid = await this.authServ.getUID() as string;
      await this.updateProducts(uid, products);
      await this.removeFromStorage(uid, uuid);
      await this.snackbar.openMessage("Producto borrado con éxito!");
    });
  }

  async removeFromStorage(uid: string, uuid: string) {
    try {
      let folderRef = ref(this.storage, `${uid}/${uuid}`);
      await list(folderRef)
      .then(async (result) => {
        for(let item of result.items)
          await deleteObject(item);
      }).catch((err) => {
        
      });
    } catch (error) {
      throw error;
    }
  }

  private async updateProducts(uid: string, products: Array<Product>) {
    try {
      let docRef = doc(this.firestore, `/users/${uid}/data/products`);
      await setDoc(docRef, {products});
    } catch (error) {
      throw error;
    }
  }

  async updateProduct(product: Product, products: Array<Product>) {
    try {
      products = products.map(prod => {
        if(prod.uuid != product.uuid)
          return prod;
        else
          return { ...prod, ...product };
      });
      let uid = await this.authServ.getUID();
      await this.updateProducts(uid!, products);
      this.snackbar.openMessage("¡Producto actualizado con éxito!");
    } catch (error) {
      this.snackbar.openMessage("No se pudo actualizar el producto");
    }
  }

  async goToProducts() {
    try {
      let uid = await this.authServ.getUID();
      let urlTree = this.router.createUrlTree([`/public/menu`], {queryParams: {id: uid}, })
      let url = `${window.location.origin}/${urlTree}`;
      let qr = await qrcode.toDataURL(url);
      const dialog = this.dialog.open(MenuUrlDisplayerComponent, {data: {url, qr}})
    } catch (error) {
      console.log(error);
      this.snackbar.openMessage("Hubo un problema al redirigirte al menu");
    }
  }
}
