import { Component, OnInit } from '@angular/core';
import { TableColumn } from '../../../core/generics/table-column';
import { ProductsService } from './products.service';
import { productTableHeaders } from './products-table.headers';
import { PageEvent } from '@angular/material/paginator';

@Component({
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {

  title : string = "Listado de productos";
  data : Array<any> = [];
  headers : Array<TableColumn> = productTableHeaders;
  size: number = 0;
  

  constructor(
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.productsService.fetchProducts()
    .then((result) => {
      this.data = result;
    })
    .catch((err) => {});
  }

  create() {}

  edit() {}

  deleteItem() {}

  changePage(page: PageEvent) {}
}
