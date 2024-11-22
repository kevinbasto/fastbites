import { Component, OnInit } from '@angular/core';
import { MenuService } from './menu.service';
import { Product } from '../../../core/entities/product';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit{

  items: Array<any> = [];

  products?: Array<Product>;

  constructor(
    private menuServ: MenuService
  ) {}

  ngOnInit(): void {
    this.menuServ.fetchProducts()
    .subscribe(products => {
      this.products = products;
    })
  }

  addProduct(product: Product){}
}
