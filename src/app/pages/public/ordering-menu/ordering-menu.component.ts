import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderingMenuService } from './ordering-menu.service';
import { Product } from '../../../core/entities/product';
import { SnackbarService } from '../../../core/services/snackbar/snackbar.service';

@Component({
  selector: 'app-ordering-menu',
  templateUrl: './ordering-menu.component.html',
  styleUrl: './ordering-menu.component.scss'
})
export class OrderingMenuComponent implements OnInit {

  cart: Array<any> = [];
  products!: Array<Product>
  id?: string;

  constructor(
    private orderingMenuServ: OrderingMenuService,
    private route: ActivatedRoute,
    private snackServ: SnackbarService
  ) {}

  ngOnInit(): void {
    this.orderingMenuServ.products$.subscribe(products => this.products = products);
    this.route.queryParamMap.subscribe((queryParams) => {
      this.id = queryParams.get("id")?? "";
      if(this.id) this.fetchMenu()
    });
  }

  fetchMenu() {
    this.orderingMenuServ.setMenuId(this.id!);
  }

  addItemTocheckout(item : Product){
    this.cart.push(item);
    this.snackServ.openMessage("Item agregado al carrito", 100);
  }
 
  checkout() {
    this.orderingMenuServ.loadCheckoutMenu(this.cart)
    .then(() => {
      this.cart = [];
    })
  }
}
