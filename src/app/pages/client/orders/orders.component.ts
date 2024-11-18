import { Component, OnInit } from '@angular/core';
import { TableColumn } from '../../../core/generics/table-column';
import { TableConfig } from '../../../core/generics/table-config';
import { OrdersTableHeaders } from './orders-table.headers';
import { OrdersService } from './orders.service';
import { Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit{
  title : string = "Listado de productos";
  data : Array<any> = [];
  headers : Array<TableColumn> = OrdersTableHeaders;
  size: number = 0;

  constructor(
    private ordersService: OrdersService
  ) {}

  ngOnInit(): void {
    this.ordersService.orders$.subscribe(orders => {
      orders.map(order => {
        let timestamp : Timestamp = order.date as any;
        order.date = timestamp.toDate();
      });
      console.log(orders);
      this.data = orders;
    })
  }
}
