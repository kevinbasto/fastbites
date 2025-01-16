import { Component, OnInit, signal } from '@angular/core';
import { MenuService } from './menu.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../core/entities/product';
import { Message } from '../../../core/generics/message';
import { Category } from '../../../core/entities/category';
import { Menu } from '../../../core/entities/menu';
import { Submenu } from '../../../core/entities/submenu';
import { SnackbarService } from '../../../core/services/snackbar/snackbar.service';
import { Personalization } from '../../../core/entities/personalization';


type SubmenuCategory = {
  submenu: Submenu;
  categories: Array<CategoryProduct>
}

type CategoryProduct = {
  category: Category;
  products: Array<Product>;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {

  id?: string;
  scannerMode: boolean = false;
  activeFetch: boolean = false;
  stop: boolean = false;
  products?: Array<Product>;
  cart: Array<Product> = []

  menu?: Menu;
  displayMenu?: Array<SubmenuCategory>;

  personalization?: Personalization;

  constructor(
    public menuService: MenuService,
    private route: ActivatedRoute,
    private snackbar: SnackbarService
  ) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(queryParams => {
      let id = queryParams.get("id");
      if (id) {
        this.id = id;
        this.scannerMode = false;
        this.getMenu(this.id);
      } else {
        this.scannerMode = true
      }
    });
  }

  processScan(scan: string) {
    if (!this.activeFetch) {
      this.activeFetch = true;
      this.menuService.processScan(scan)
        .then((id) => {
          this.id = id;
          this.stop = true;
          this.scannerMode = false;
          this.getMenu(id);
        })
        .catch((err) => {
          this.stop = false;
        })
        .finally(() => {
          this.activeFetch = false;
        });
    }
  }

  getMenu(id: string) {
    this.menuService.fetchMenu(id)
      .subscribe((menu: Menu) => {
        this.menu = menu;
        this.processMenu()
      });
    this.menuService.fetchPersonalization(id)
      .then((personalization: Personalization) => {
        this.personalization = personalization;
        let menu = document.getElementById("menu")!
        if(menu)
          menu.style.background = personalization.personalization.background as string;
      }).catch((err) => {
        console.log(err);
        this.snackbar.openMessage('Hubo un error al aplicar la capa de personalización');
      });
  }

  setProducts(products: Array<Product>) {
    if (products.length === 0) {
      this.scannerMode = true;
      this.stop = false;
      return;
    }
    this.products = products;
    this.products = this.products.filter(product => product.available);
  }

  addProductToCart(prod: Product) {
    this.cart.push(prod);
    this.snackbar.openMessage('Producto Agregado al carrito con éxito');
  }

  goToCheckout() {
    this.menuService.goToCheckout(this.cart, this.id!)
      .then((result: "COMPLETED" | "CANCELED" | "DELETE") => {
        if (result == "COMPLETED")
          this.cart = [];
        else if (result == 'DELETE')
          this.cart = [];
      }).catch((err) => {

      });
  }


  processMenu() {
    const { submenus, categories, products } = this.menu!;
    let subs: Array<SubmenuCategory> = [];
    let date = new Date();
    let currentDay = date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    let currentTime = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    for (let submenu of submenus) {
      if (!submenu.available) continue;
      const { openingHour, closingHour, days } = submenu.time;
      const isDayAvailable =
        Object.values(days).every(value => !value) || // Si todos los días son falsos, está disponible siempre
        days[currentDay];
      if (!isDayAvailable) continue;
      if (openingHour && closingHour) {
        const openingTime = this.convertTo24HourTime(openingHour);
        const closingTime = this.convertTo24HourTime(closingHour);
        if (!(currentTime >= openingTime && currentTime <= closingTime)) {
          continue;
        }
      }
      let submenuCategories: Array<CategoryProduct> = [];
      for (let categoryId of submenu.categories) {
        let category = categories.find(c => c.id === categoryId);
        if (category && category.available) {
          let categoryProducts = products.filter(
            product => product.category === category.id && product.available
          );
          submenuCategories.push({
            category,
            products: categoryProducts
          });
        }
      }
      subs.push({
        submenu,
        categories: submenuCategories
      });
    }
    this.displayMenu = subs;
  }

  convertTo24HourTime(time: string): string {
    const [hoursMinutes, period] = time.split(/(AM|PM)/i);
    let [hours, minutes] = hoursMinutes.split(':').map(Number);
    if (period.toUpperCase() === 'PM' && hours !== 12) {
      hours += 12;
    } else if (period.toUpperCase() === 'AM' && hours === 12) {
      hours = 0;
    }
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }

}
