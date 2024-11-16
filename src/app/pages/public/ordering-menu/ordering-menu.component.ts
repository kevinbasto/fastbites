import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderingMenuService } from './ordering-menu.service';
import { Product } from '../../../core/entities/product';

@Component({
  selector: 'app-ordering-menu',
  templateUrl: './ordering-menu.component.html',
  styleUrl: './ordering-menu.component.scss'
})
export class OrderingMenuComponent implements OnInit {

  products!: Array<Product>
  id?: string;

  constructor(
    private orderingMenuServ: OrderingMenuService,
    private route: ActivatedRoute
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
  
}
