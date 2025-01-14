import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductsRepoService } from '../../../../../core/repos/products-repo/products-repo.service';
import { Product } from '../../../../../core/entities/product';
import { ViewProductComponent } from '../../dialogs/view-product/view-product.component';
import { Message } from '../../../../../core/generics/message';
import { ConfirmDialogComponent } from '../../../../../shared-components/confirm-dialog/confirm-dialog.component';
import { SnackbarService } from '../../../../../core/services/snackbar/snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private matDialog: MatDialog,
    private productRepo: ProductsRepoService,
    private snackbar: SnackbarService,
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
    dialog.afterClosed().subscribe((confirmation: boolean) => {
      if(!confirmation) return;
      this.productRepo.deleteProduct(product)
      .then((result) => {
        this.snackbar.openMessage('Submenu borrado con éxito');
      }).catch((err) => {
        this.snackbar.openMessage('No se pudo borrar el submenú');
      });
    })
  }

  toggleProduct(product: Product) {
    product.available = !product.available;
    this.productRepo.updateProduct(product)
    .then((result) => {
      this.snackbar.openMessage('Producto actualizada con éxito');
    }).catch((err) => {
      this.snackbar.openMessage('No se pudo actualizar la Producto');
    });
  }
  
}
