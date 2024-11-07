import { Component } from '@angular/core';
import { TableColumn } from '../../../core/entities/table-column';
import { ProductsService } from './products.service';
import { productTableHeaders } from './products-table.headers';

@Component({
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

  title : string = "Listado de productos";
  data : Array<any> = [];
  headers : Array<TableColumn> = productTableHeaders;
  size: number = 0;

  constructor(
    private productsService: ProductsService
  ) {}

}
