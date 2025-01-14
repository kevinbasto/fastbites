import { Injectable } from '@angular/core';
import { CategoriesRepoService } from '../../../../../core/repos/categories-repo/categories-repo.service';
import { Category } from '../../../../../core/entities/category';
import { MatDialog } from '@angular/material/dialog';
import { Message } from '../../../../../core/generics/message';
import { ConfirmDialogComponent } from '../../../../../shared-components/confirm-dialog/confirm-dialog.component';
import { ViewCategoryComponent } from '../../dialogs/view-category/view-category.component';
import { SnackbarService } from '../../../../../core/services/snackbar/snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(
    private matDialog: MatDialog,
    private categoriesRepo: CategoriesRepoService,
    private snackbar: SnackbarService
  ) { }

  viewCategory(category: Category) {
    const dialog = this.matDialog.open(ViewCategoryComponent, { data: { category } })
  }

  deleteCategory(category: Category) {
    const message: Message = {
      name: '¿Borrar Sub-menú?',
      message: 'Una vez hecha esta acción no se puede deshacer'
    };
    const dialog = this.matDialog.open(ConfirmDialogComponent, { data: { ...message } });
    dialog.afterClosed().subscribe((confirmation: boolean) => {
      if(!confirmation) return;
      this.categoriesRepo.deleteCategory(category)
      .then((result) => {
        this.snackbar.openMessage('Submenu borrado con éxito');
      }).catch((err) => {
        this.snackbar.openMessage('No se pudo borrar el submenú');
      });
    })
  }

  toggleCategory(category: Category) {
    category.available = !category.available;
    this.categoriesRepo.updateCategory(category)
    .then((result) => {
      this.snackbar.openMessage('Categoría actualizada con éxito');
    }).catch((err) => {
      this.snackbar.openMessage('No se pudo actualizar la categoría');
    });
  }

}
