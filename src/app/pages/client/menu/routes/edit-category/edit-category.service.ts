import { Injectable } from '@angular/core';
import { CategoriesRepoService } from '../../../../../core/repos/categories-repo/categories-repo.service';
import { Category } from '../../../../../core/entities/category';
import { AuthService } from '../../../../../core/services/auth/auth.service';
import { SnackbarService } from '../../../../../core/services/snackbar/snackbar.service';
import { MenuRepoService } from '../../../../../core/repos/menu-repo/menu-repo.service';
import { Menu } from '../../../../../core/entities/menu';

@Injectable({
  providedIn: 'root'
})
export class EditCategoryService {

  constructor(
    private menuRepo: MenuRepoService,
    private categoriesRepo: CategoriesRepoService,
    private auth: AuthService,
    private snackbar: SnackbarService
  ) { }

  async fetchMenu() {
    try {
      let uid = await this.auth.getUID();
      let menu : Menu = await this.menuRepo.fetchMenu(uid) as Menu;
      return menu;
    } catch (error) {
      this.snackbar.openMessage('No se pudo esco');
      throw error;
    }
  }

  editCategory(category: Category) {
    return this.categoriesRepo.updateCategory(category);
  }
}
