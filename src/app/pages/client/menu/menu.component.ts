import { Component, OnInit } from '@angular/core';
import { MenuService } from './menu.service';
import { Menu } from '../../../core/entities/menu';
import { Product } from '../../../core/entities/product';
import { Category } from '../../../core/entities/category';
import { Submenu } from '../../../core/entities/submenu';

@Component({
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {

  menu?: Menu;
  products?: Array<Product>;
  categories?: Array<Category>;
  submenus?: Array<Submenu>;
  
  constructor(
    private menuService: MenuService,
  ) {}

  ngOnInit(): void {
    this.menuService.menu$.subscribe(menu => {
      if(!menu) return;
      const { products, categories, submenus } = menu;
      this.products = products;
      this.categories = categories;
      this.submenus = submenus;
      this.menu = menu;
    });
    this.menuService.fetchMenu();
  }

  exportMenu(): void {
    this.menuService.exportMenu();
  }

  importMenu(): void {
    this.menuService.importMenu();
  }

}
