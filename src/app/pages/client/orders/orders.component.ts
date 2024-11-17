import { Component } from '@angular/core';
import { TableColumn } from '../../../core/generics/table-column';
import { TableConfig } from '../../../core/generics/table-config';
import { OrdersTableHeaders } from './orders-table.headers';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {
  title : string = "Listado de productos";
  data : Array<any> = [];
  headers : Array<TableColumn> = OrdersTableHeaders;
  size: number = 0;
  tableConfig: TableConfig = {
    pagination: false,
    ordersButton: true
  }
}
