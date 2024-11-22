import { Component, OnInit } from '@angular/core';
import { TableColumn } from '../../../core/generics/table-column';
import { ProductsService } from './products.service';
import { productTableConfig, productTableHeaders } from './products-table.headers';
import { Product } from '../../../core/entities/product';
import { TableConfig } from '../../../core/generics/table-config';

@Component({
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {

  title : string = "Listado de productos";
  data : Array<any> = [];
  headers : Array<TableColumn> = productTableHeaders;
  tableConfig: TableConfig = productTableConfig;
  
  

  constructor(
    private productsService: ProductsService,
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

  goToOrderingPage() {
    this.productsService.goToProducts()
  }
}
