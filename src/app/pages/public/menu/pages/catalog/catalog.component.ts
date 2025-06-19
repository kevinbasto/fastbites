import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../../../core/entities/product';
import { Message } from '../../../../../core/generics/message';
import { Category } from '../../../../../core/entities/category';
import { Menu } from '../../../../../core/entities/menu';
import { Submenu } from '../../../../../core/entities/submenu';
import { SnackbarService } from '../../../../../core/services/snackbar/snackbar.service';
import { Personalization } from '../../../../../core/entities/personalization';
import { CatalogService } from './catalog.service';
import { MenuService } from '../../menu.service';
import { schedulesRepoService } from '../../../../../core/repos/schedule-repo/schedule-repo.service';
import { Schedule } from '../../../../../core/entities/schedule';



type SubmenuCategory = {
  submenu: Submenu;
  categories: Array<CategoryProduct>
}

type CategoryProduct = {
  category: Category;
  products: Array<Product>;
}


@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss'
,
  standalone: false})
export class CatalogComponent {

  id?: string;
  products?: Array<Product>;
  cart: Array<Product> = []

  menu?: Menu;
  displayMenu?: Array<SubmenuCategory>;
  schedules?: Array<Schedule>;

  personalization?: Personalization;

  constructor(
    private menuService: MenuService,
    public catalogService: CatalogService,
    private snackbar: SnackbarService,
    private scheduleRepo: schedulesRepoService
  ) { }

  ngOnInit(): void {
    this.getMenu(this.menuService.menuId!)
    this.scheduleRepo.fetchSchedulesWithoutid(this.menuService.menuId!)
    .then((schedules: Array<Schedule>) => {
      this.schedules = schedules;
    }).catch((err) => {
      this.snackbar.openMessage('Hubo un error obtener los horarios')
    });
  }

  getMenu(id: string) {
    this.catalogService.fetchMenu(id)
      .subscribe((menu: Menu) => {
        this.menu = menu;
        this.processMenu()
      });
    this.catalogService.fetchPersonalization(id)
      .then((personalization: Personalization) => {
        this.menuService.personalization.next(personalization);
        this.personalization = personalization;
        let menu = document.getElementById("menu")!
        if (menu)
          menu.style.background = personalization.personalization.background as string;
      }).catch((err) => {
        this.snackbar.openMessage('Hubo un error al aplicar la capa de personalización');
      });
  }

  setProducts(products: Array<Product>) {
    if (products.length === 0) {
      return;
    }
    this.products = products;
    this.products = this.products.filter(product => product.available);
  }

  addProductToCart(prod: Product) {
    this.cart.push(prod);
    this.menuService.cart$.next(this.cart);
    this.snackbar.openMessage('Producto Agregado al carrito con éxito');
  }

  checkProductDetail(product: Product){
    this.catalogService.checkProductDetail(product)
    .then((result) => {
      if(!result) return;
      const { product, quantity } = result;
      for(let i = 0; i < quantity; i++){
        this.cart.push(product);
        this.menuService.cart$.next(this.cart);
      }
      
    }).catch((err) => {
      
    });
  }

  goToCheckout() {
    this.catalogService.goToCheckout(this.cart, this.id!)
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
