import { Component, OnInit, signal } from '@angular/core';
import { MenuService } from './menu.service';
import { Product } from '../../../core/entities/product';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Menu } from '../../../core/entities/menu';
import { Category } from '../../../core/entities/category';
import { SnackbarService } from '../../../core/services/snackbar/snackbar.service';

type MenuCategory = {
  category: Category,
  products: Array<Product>
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {
  menuCategories?: Array<MenuCategory>;
  items: Array<any> = [];
  cart: Array<Product> = []

  products?: Array<Product>;
  readonly panelOpenState = signal(false);

  constructor(
    private menuServ: MenuService,
    private authService: AuthService,
    private snackbar: SnackbarService
  ) { }

  ngOnInit(): void {
    this.menuServ.fetchProducts()
      .subscribe((menu: Menu) => {
        this.menuCategories = menu.categories.map(category => ({
          category,
          products: menu.products.filter(product => product.category === category.id)
        }));
      });
  }

  addProduct(product: Product) {
    console.log(`invoked`);
    this.cart.push(product);
    this.snackbar.openMessage("Producto agregado al carrito!", 200);
  }

  async goToCheckout() {
    try {
      let uid = await this.authService.getUID()
      this.menuServ.goToCheckout(this.cart, uid!)
        .then((result) => {
          this.cart = []
        }).catch((err) => {

        });
    } catch (error) {
      throw error;
    }
  }
}
