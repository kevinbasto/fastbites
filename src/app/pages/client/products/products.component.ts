import { Component, OnInit } from '@angular/core';
import { TableColumn } from '../../../core/generics/table-column';
import { ProductsService } from './products.service';
import { productTableHeaders } from './products-table.headers';
import { PageEvent } from '@angular/material/paginator';
import { Product } from '../../../core/entities/product';

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
    this.productsService.products$!.subscribe(products => {
      this.data = products;
    });
  }

  create() {
    this.productsService.createNewProduct();
  }

  edit(product: Product) {
    this.productsService.editProduct(product);
  }

  deleteItem(product: Product) {
    this.productsService.deleteProduct(product, this.data);
  }

  toggleProduct(product: Product) {
    product.available = !product.available;
    this.productsService.updateProduct(product, this.data);
  }

  changePage(page: PageEvent) {}
}
