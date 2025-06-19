import { Component, OnInit } from '@angular/core';
import { TableColumn } from '../../../core/generics/table-column';
import { OrdersTableHeaders } from './orders-table.headers';
import { OrdersService } from './orders.service';
import { Timestamp } from '@angular/fire/firestore';
import { Order } from '../../../core/entities/order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
,
  standalone: false})
export class OrdersComponent implements OnInit {
  title: string = "Listado de productos";
  orders?: Array<Order>;
  headers: Array<TableColumn> = OrdersTableHeaders;
  size: number = 0;

  constructor(
    private ordersService: OrdersService
  ) { }

  ngOnInit(): void {
    this.ordersService.orders$.subscribe(orders => {
      orders
        .map(order => {
          let timestamp: Timestamp = order.date as any;
          order.date = timestamp.toDate();
          return order;
        });
      // Ordenar los pedidos de más antiguo a más reciente
      orders.sort((a: Order, b: Order) => a.date.getTime() - b.date.getTime());
      this.orders = orders;
    });
  }

  detailOrder(order: Order) {
    this.ordersService.detailOrder(order);
  }

  closeOrder(order: Order) {
    this.ordersService.closeOrder(order);
  }

  cancelOrder(order: Order) {
    this.ordersService.cancelOrder(order);
  }
}
