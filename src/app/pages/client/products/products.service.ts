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
import { ProductVisualizerComponent } from '../../../shared-components/product-visualizer/product-visualizer.component';
import { ProductsRepoService } from '../../../core/repos/products-repo/products-repo.service';
import { Storage, deleteObject, listAll, ref } from '@angular/fire/storage';
import { ProductsImporterDialogComponent } from '../../../shared-components/products-importer-dialog/products-importer-dialog.component';
import { XlsxProcessorService } from '../../../core/services/xlsx-processor/xlsx-processor.service';


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
    private qrGenerator: QrGeneratorService,
    private productsRepo: ProductsRepoService,
    private storage: Storage,
    private xlsxService: XlsxProcessorService 
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
  filterProductsByCategory(category: Category, products: Array<Product>): Array<Product> {
    let prods: Array<Product> = [];
    for (let product of products)
      if (product.category == category.id)
        prods.push(product);
    return prods;
  }

  importProductsFromFile() {
    return new Promise<void>((resolve, reject) => {
      const dialog = this.dialog.open(ProductsImporterDialogComponent);
    dialog.afterClosed().subscribe(async (file: File) => {
      if (!file) return;
  
      try {
        const products: Array<any> = await this.xlsxService.convertToJson(file);
        const uid = await this.auth.getUID();
        let menu: Menu = await this.menuRepo.fetchMenu(uid) as unknown as Menu;
        let prods : Array<Product> = [];
        products.forEach(product => {
          let {nombre, descripcion, categoria, costo, precio } = product;
          console.table(menu.categories)
          console.log(categoria.toLocaleLowerCase());
          let category = menu.categories.find(cat => cat.name.toLowerCase() == product.categoria.toLowerCase());
          if(!category){
            category = {name: product.categoria, id: uuid()};
            menu.categories.push(category);
          }
          let prod : Product = {
            id: uuid(),
            name: nombre,
            category: category.id,
            description: descripcion,
            cost: costo,
            price: precio,
            available: false,
            rawImage: '',
            croppedImage: '',
            croppedPosition: {
              x1: 0,
              x2: 0,
              y1: 0,
              y2: 0
            }
          }
          prods.push(prod);
        });
        menu.products = [...menu.products, ...prods];
        await this.menuRepo.updateMenu(uid, menu);
        this.snackbar.openMessage("Productos importados con exito!");
        resolve()
      } catch (error) {
        this.snackbar.openMessage("Hubo un error al importar los productos");
        reject()
      }
    });
    })
  }

  async viewQrDialog() {
    try {
      let uid = await this.auth.getUID();
      let origin = environment.domain;
      let [protocol, domain] = origin.split("//");
      let url = `${protocol}//client.${domain}?id=${uid}`;
      let qr = await this.qrGenerator.renderQrFromUrl(url);
      const dialog = this.dialog.open(MenuUrlDisplayerComponent, { data: { url, qr } })
    } catch (error) {
      throw error;
    }
  }

  //table events related methods
  viewProduct(product: Product) {
    const dialog = this.dialog.open(ProductVisualizerComponent, { data: { product } })
  }

  deleteProduct(product: Product) {
    const message: Message = {
      name: "¿Borrar el producto?",
      message: "una vez hecho no se puede deshacer"
    };
    return new Promise<void>((resolve, reject) => {
      const dialog = this.dialog.open(ConfirmDialogComponent, { data: { ...message } });
      dialog.afterClosed().subscribe((confirmation: boolean) => {
        if (!confirmation) resolve();
        this.clearProduct(product)
        .then((result) => {
          this.snackbar.openMessage("Item borrado con éxito");
          resolve();
        }).catch((err) => {
          reject();
        });
      });
    })
  }

  private async clearProduct(product: Product) {
    try {
      let uid = await this.auth.getUID();
      let dir = ref(this.storage, `${uid}/${product.id}`);
      let items = await listAll(dir);
      for (let item of items.items)
        await deleteObject(item);
      await this.productsRepo.deleteProduct(uid, product)
    } catch (error) {
      this.snackbar.openMessage("No se pudo borrar las imagenes de los productos");
    }
  }

  async toggleProduct(product: Product) {
    try {
      let uid = await this.auth.getUID();
      product.available = !product.available;
      await this.productsRepo.updateProduct(uid, product);
      this.snackbar.openMessage("Producto actualizado con éxito")
    } catch (error) {
      this.snackbar.openMessage("No se pudo actualizar el producto")
    }
  }

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
