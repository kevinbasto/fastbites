import { Component, OnInit } from '@angular/core';
import { TableColumn } from '../../../core/generics/table-column';
import { ProductsService } from './products.service';
import { productTableConfig, productTableHeaders } from './products-table.headers';
import { Product } from '../../../core/entities/product';
import { TableConfig } from '../../../core/generics/table-config';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { PageEvent } from '@angular/material/paginator';

@Component({
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {

  title : string = "Listado de productos";
  data? : Array<any>;
  headers : Array<TableColumn> = productTableHeaders;
  tableConfig: TableConfig = productTableConfig;
  filtersOpened: boolean = false;
  shadow: boolean = false;

  constructor(
    private productsService: ProductsService,
    private breakpoint: BreakpointObserver
  ) {
    this.breakpoint.observe(['(max-width: 600px)']).subscribe((matcher: BreakpointState) => {
      this.shadow = matcher.matches;
    });
  }

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

  openSelectedProduct(product: Product) {
    this.productsService.VisualizeProduct(product);
  }

  deleteItem(product: Product) {
    this.productsService.deleteProduct(product, this.data!);
  }

  toggleProduct(product: Product) {
    product.available = !product.available;
    this.productsService.updateProduct(product, this.data!);
  }

  goToOrderingPage() {
    this.productsService.goToProducts()
  }

  changePage(page: PageEvent) {
    
  }
}
