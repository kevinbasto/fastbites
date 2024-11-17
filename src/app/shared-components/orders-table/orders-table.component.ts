import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Order } from '../../core/entities/order';

@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  styleUrl: './orders-table.component.scss'
})
export class OrdersTableComponent {

  @Input() orders!: Array<Order>;

  @Output() details : EventEmitter<Order> = new EventEmitter<Order>();
  @Output() closeOrder: EventEmitter<Order> = new EventEmitter<Order>();
  @Output() cancelOrder: EventEmitter<Order> = new EventEmitter<Order>();

  displayedColumns : string[] = [
    "name",
    "amount",
    "date"
  ];
  
}
