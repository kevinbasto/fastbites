import { Component, OnInit } from '@angular/core';
import { MenuService } from './menu.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../core/entities/product';
import { Message } from '../../../core/generics/message';

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

  constructor(
    public menuService: MenuService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(queryParams => {
      let id = queryParams.get("id");
      if (id) {
        this.id = id;
        this.scannerMode = false;
        this.menuService.fetchMenu(this.id!)
        .subscribe((products) => this.setProducts(products));
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
          this.menuService.fetchMenu(this.id!)
          .subscribe((products) => this.setProducts(products));
        })
        .catch((err) => {
          this.stop = false;
        })
        .finally(() => {
          this.activeFetch = false;
        });
    }
  }

  setProducts(products : Array<Product>){
    if(products.length === 0){
      this.scannerMode = true;
      this.stop = false;
      return;
    }
    this.products = products;
    this.products = this.products.filter(product => product.available);
  }

  addProductToCard(prod: Product) {
    this.cart.push(prod)
  }

  goToCheckout() {
    this.menuService.goToCheckout(this.cart, this.id!)
    .then((result : "COMPLETED" | "CANCELED" | "DELETE") => {
      if(result == "COMPLETED")
        this.cart = [];
      else if(result == 'DELETE')
        this.cart = [];
    }).catch((err) => {
      
    });
  }
}
