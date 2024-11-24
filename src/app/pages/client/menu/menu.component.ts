import { Component, OnInit } from '@angular/core';
import { MenuService } from './menu.service';
import { Product } from '../../../core/entities/product';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {

  items: Array<any> = [];
  cart: Array<Product> = []

  products?: Array<Product>;

  constructor(
    private menuServ: MenuService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.menuServ.fetchProducts()
      .subscribe(products => {
        this.products = products;
      })
  }

  addProduct(product: Product) {
    this.cart.push(product)
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
