import { Component } from '@angular/core';
import { TableColumn } from '../../../core/entities/table-column';
import { ProductsService } from './products.service';

@Component({
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

  title : string = "Listado de productos";
  data : Array<any> = [];
  headers : Array<TableColumn> = [
    {
      name: "name",
      displayName: "Nombre"
    },
    {
      name: "description",
      displayName: "Descripción"
    },
    {
      name: "price",
      displayName: "Precio"
    },
  ];
  size: number = 0;

  constructor(
    private productsService: ProductsService
  ) {}

}
