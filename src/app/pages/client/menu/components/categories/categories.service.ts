import { Injectable } from '@angular/core';
import { CategoriesRepoService } from '../../../../../core/repos/categories-repo/categories-repo.service';
import { Category } from '../../../../../core/entities/category';
import { MatDialog } from '@angular/material/dialog';
import { Message } from '../../../../../core/generics/message';
import { ConfirmDialogComponent } from '../../../../../shared-components/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(
    private matDialog: MatDialog,
    private categoriesRepo: CategoriesRepoService
  ) { }

  viewCategory(category: Category) { }

  deleteCategory(category: Category) {
    const message: Message = {
      name: '¿Borrar Sub-menú?',
      message: 'Una vez hecha esta acción no se puede deshacer'
    };
    const dialog = this.matDialog.open(ConfirmDialogComponent, { data: { ...message } });
  }

  toggleCategory(category: Category) { }

}
