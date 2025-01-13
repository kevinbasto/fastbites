import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductsRepoService } from '../../../../../core/repos/products-repo/products-repo.service';
import { Product } from '../../../../../core/entities/product';
import { ViewProductComponent } from '../../dialogs/view-product/view-product.component';
import { Message } from '../../../../../core/generics/message';
import { ConfirmDialogComponent } from '../../../../../shared-components/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private matDialog: MatDialog,
    private productRepo: ProductsRepoService
  ) { }

  visualizeProduct(product: Product) {
    const dialog = this.matDialog.open(ViewProductComponent, { data: { product } });
  }

  deleteProduct(product: Product) {
    const message : Message = {
      name: '¿Borrar Producto?',
      message: 'Una vez hecha esta acción no se puede deshacer'
    };
    const dialog = this.matDialog.open(ConfirmDialogComponent, { data: { ...message } });
  }

  toggleProduct(product: Product) {

  }
  
}
