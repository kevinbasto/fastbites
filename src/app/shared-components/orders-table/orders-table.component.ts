import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Order } from '../../core/entities/order';
import { TableColumn } from '../../core/generics/table-column';

@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  styleUrl: './orders-table.component.scss'
,
  standalone: false})
export class OrdersTableComponent implements OnChanges {

  @Input() orders!: Array<Order>;
  @Input() headers? : Array<TableColumn>;

  @Output() details : EventEmitter<Order> = new EventEmitter<Order>();
  @Output() closeOrder: EventEmitter<Order> = new EventEmitter<Order>();
  @Output() cancelOrder: EventEmitter<Order> = new EventEmitter<Order>();

  dataSource : Array<Order> = []
  displayedColumns : string[] = [
    "name",
    "amount",
    "date"
  ];

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['headers'])
      this.setHeaders()

    if(changes['orders'])
      this.dataSource = this.orders!
  }

  setHeaders(){
    this.displayedColumns = [];
    for(let header of this.headers!)
      this.displayedColumns.push(header.name);
    this.displayedColumns.push('options')
  }

  
}
