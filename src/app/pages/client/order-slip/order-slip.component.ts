import { Component, OnInit, signal } from '@angular/core';
import { OrderSlipservice } from './order-slip.service';
import { Product } from '../../../core/entities/product';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Menu } from '../../../core/entities/menu';
import { Category } from '../../../core/entities/category';
import { SnackbarService } from '../../../core/services/snackbar/snackbar.service';
import { Submenu } from '../../../core/entities/submenu';

type SubmenuCategory = {
  submenu: Submenu
  categories: Array<CategoryProduct>
}

type CategoryProduct = {
  category: Category;
  products: Array<Product>;
}

@Component({
  selector: 'app-menu',
  templateUrl: './order-slip.component.html',
  styleUrl: './order-slip.component.scss'
})
export class OrderSlipComponent implements OnInit {

  menu?: Menu;
  displayMenu?: Array<SubmenuCategory>;

  constructor(
    private orderSlipService: OrderSlipservice,
    private authService: AuthService,
    private snackbar: SnackbarService
  ) { }

  ngOnInit(): void {
    this.orderSlipService.fetchMenu()
      .subscribe((menu: Menu) => {
        this.menu = menu;
        this.processMenu();
      });
  }

  processMenu() {
    const { submenus, categories, products } = this.menu!;
    let subs: Array<SubmenuCategory> = [];
    let date = new Date();
    let currentDay = date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    let currentTime = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    for (let submenu of submenus) {
      // Verificar si el submenú está disponible
      if (!submenu.available) continue;

      const { openingHour, closingHour, days } = submenu.time;

      // Comprobar si el submenú está disponible según los días
      const isDayAvailable =
        Object.values(days).every(value => !value) || // Si todos los días son falsos, está disponible siempre
        days[currentDay];

      if (!isDayAvailable) continue;

      // Comprobar si los horarios están definidos
      if (openingHour && closingHour) {
        const openingTime = this.convertTo24HourTime(openingHour);
        const closingTime = this.convertTo24HourTime(closingHour);

        // Verificar si la hora actual está dentro del rango de apertura y cierre
        if (!(currentTime >= openingTime && currentTime <= closingTime)) {
          continue;
        }
      }

      // Encontrar las categorías asociadas al submenú
      let submenuCategories: Array<CategoryProduct> = [];
      for (let categoryId of submenu.categories) {
        let category = categories.find(c => c.id === categoryId);

        if (category && category.available) {
          // Encontrar los productos asociados a la categoría
          let categoryProducts = products.filter(
            product => product.category === category.id && product.available
          );

          // Añadir la categoría y sus productos al submenú
          submenuCategories.push({
            category,
            products: categoryProducts
          });
        }
      }

      // Añadir el submenú con sus categorías y productos
      subs.push({
        submenu,
        categories: submenuCategories
      });
    }
    this.displayMenu = subs;
  }

  // Función para convertir la hora en formato 12 horas a 24 horas
  convertTo24HourTime(time: string): string {
    const [hoursMinutes, period] = time.split(/(AM|PM)/i);
    let [hours, minutes] = hoursMinutes.split(':').map(Number);
    if (period.toUpperCase() === 'PM' && hours !== 12) {
      hours += 12;
    } else if (period.toUpperCase() === 'AM' && hours === 12) {
      hours = 0;
    }

    // Formatear a "hh:mm" (ejemplo: "09:05")
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }

  addProduct(product: Product) {

  }

  async goToCheckout() {

  }
}
