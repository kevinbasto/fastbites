import { Injectable } from '@angular/core';
import { MenuRepoService } from '../../../core/repos/menu-repo/menu-repo.service';
import { AuthService } from '../../../core/services/auth/auth.service';
import { SnackbarService } from '../../../core/services/snackbar/snackbar.service';
import { Menu } from '../../../core/entities/menu';
import { Product } from '../../../core/entities/product';
import { PageEvent } from '@angular/material/paginator';
import { Category } from '../../../core/entities/category';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  menu!: Menu;

  constructor(
    private auth: AuthService,
    private menuRepo : MenuRepoService,
    private snackbar: SnackbarService
  ) { }

  fetchMenu() : Promise<Menu> {
    return new Promise<Menu>(async (resolve, reject) => {
      try {
        let uid = await this.auth.getUID();
        if(uid == "")
          throw new Error("No hay un UID válido");
        let menu: Menu | null = await this.menuRepo.fetchMenu(uid);
        if(!menu)
          menu = await this.menuRepo.createNewMenu(uid);
        this.menu = menu;
        resolve(menu);
      } catch (error) {
        this.snackbar.openMessage("No se puedo obtener el menu");
        throw error;
      }
    })
  }

  //table header related methods
  filterProductsByCategory(category : Category) {}

  importProductsFromFile() {}

  viewQrDialog() {}

  //table events related methods
  viewProduct(product: Product) { }

  deleteProduct(product: Product) {}

  toggleProduct(product: Product) {}

  changePage(page: PageEvent) {}

}
