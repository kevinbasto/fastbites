import { Injectable } from '@angular/core';
import { MenuRepoService } from '../../../core/repos/menu-repo/menu-repo.service';
import { AuthService } from '../../../core/services/auth/auth.service';
import { SnackbarService } from '../../../core/services/snackbar/snackbar.service';
import { Menu } from '../../../core/entities/menu';
import { Product } from '../../../core/entities/product';
import { PageEvent } from '@angular/material/paginator';
import { Category } from '../../../core/entities/category';
import { MatDialog } from '@angular/material/dialog';
import { CreateCategoryComponent } from './dialogs/create-category/create-category.component';
import { EditCategoryComponent } from './dialogs/edit-category/edit-category.component';
import { ViewCategoryComponent } from './dialogs/view-category/view-category.component';
import { Message } from '../../../core/generics/message';
import { ConfirmDialogComponent } from '../../../shared-components/confirm-dialog/confirm-dialog.component';
import { v6 as uuid } from "uuid";
import { CategoriesRepoService } from '../../../core/repos/categories-repo/categories-repo.service';
import { QrGeneratorService } from '../../../core/services/qr-generator/qr-generator.service';
import { environment } from '../../../../environments/environment';
import { MenuUrlDisplayerComponent } from '../../../shared-components/menu-url-displayer/menu-url-displayer.component';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  menu!: Menu;

  constructor(
    private auth: AuthService,
    private menuRepo: MenuRepoService,
    private snackbar: SnackbarService,
    private dialog: MatDialog,
    private categoriesRepo: CategoriesRepoService,
    private qrGenerator: QrGeneratorService
  ) { }

  fetchMenu(): Promise<Menu> {
    return new Promise<Menu>(async (resolve, reject) => {
      try {
        let uid = await this.auth.getUID();
        if (uid == "")
          throw new Error("No hay un UID válido");
        let menu: Menu | null = await this.menuRepo.fetchMenu(uid);
        if (!menu)
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
  filterProductsByCategory(category: Category, products: Array<Product>) : Array<Product> {
    let prods : Array<Product> = [];
    for(let product of products)
      if(product.category == category.id)
        prods.push(product);
    return prods;
  }

  importProductsFromFile() { }

  async viewQrDialog() {
    try {
      let uid = await this.auth.getUID();
      let origin = environment.domain;
      let [protocol, domain] = origin.split("//");
      let url = `${protocol}//client.${domain}?id=${uid}`;
      let qr = await this.qrGenerator.renderQrFromUrl(url);
      const dialog = this.dialog.open(MenuUrlDisplayerComponent, { data: { url, qr } } )
    } catch (error) {
      throw error;
    }
  }

  //table events related methods
  viewProduct(product: Product) {}

  deleteProduct(product: Product) { }

  toggleProduct(product: Product) { }

  changePage(page: PageEvent) { }

  // category related functions
  createCategory() {
    return new Promise<void>((resolve, reject) => {
      const dialog = this.dialog.open(CreateCategoryComponent);
      dialog.afterClosed().subscribe((category: Category) => {
        if (!category) return;
        category.id = uuid();
        this.categoriesRepo.createCategory(category)
          .then(() => {
            this.snackbar.openMessage("Categoría creada con éxito");
            resolve();
          })
          .catch(err => {
            reject();
          });
      });
    });
  }

  viewCategory(category: Category) {
    this.dialog.open(ViewCategoryComponent, { data: { category } });
  }

  editCategory(category: Category) {
    return new Promise<void>((resolve, reject) => {
      const dialog = this.dialog.open(EditCategoryComponent, { data: { category } });
      dialog.afterClosed().subscribe((category: Category) => {
        if (!category) return;
        this.categoriesRepo.updateCategory(category)
          .then(() => {
            this.snackbar.openMessage("Categoría creada con éxito");
            resolve();
          })
          .catch(err => {
            reject();
          });
      });
    });
  }

  deleteCategory(category: Category) {
    return new Promise<void>((resolve, reject) => {
      const message: Message = {
        name: '¿Borrar Categoría?',
        message: 'Una vez hecha esta acción, no se puede deshacer'
      };
      const dialog = this.dialog.open(ConfirmDialogComponent, { data: { ...message } });
      dialog.afterClosed().subscribe((confirmation: boolean) => {
        if (!confirmation) return;
        this.categoriesRepo.deleteCategory(category)
        .then((result) => {
          this.snackbar.openMessage("Producto borrado con éxito");
          resolve();
        })
        .catch((err) => reject());
      });
    });
  }

}
