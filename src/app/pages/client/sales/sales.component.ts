import { Component, OnInit } from '@angular/core';
import { TableColumn } from '../../../core/generics/table-column';
import { salesTableHeaders } from './sales-table.headers';
import { TableConfig } from '../../../core/generics/table-config';
import { SalesService } from './sales.service';
import { Sale } from '../../../core/entities/sale';

@Component({
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.scss'
})
export class SalesComponent implements OnInit {
  title : string = "Listado de ventas del Día";
  data : Array<any> = [];
  headers : Array<TableColumn> = salesTableHeaders;
  size: number = 0;
  tableConfig: TableConfig = {
    create: false,
    pagination: false,
    ordersButton: false,
    options: false
  }
  date : string = "";
  total : number = 0
  months = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
  ]

  constructor(
    private salesServ: SalesService
  ) {
    let date = new Date()
    this.date = `${date.getDate()}-${this.months[date.getMonth()]}-${date.getFullYear()}`
    this.salesServ.sales$.subscribe(sales => {
      this.data = sales;
      this.total = 0;
      sales.forEach(sale => this.total += sale.total)
    });
  }
  
  salesTitle : string = "Listado de ventas del Mes";
  sales : Array<any> = [];
  salesHeaders : Array<TableColumn> = salesTableHeaders;
  MonthTotal = 0
  
  ngOnInit(): void {
    this.MonthTotal = 0;
    this.salesServ.fetchFromMonth()
    .then((sales : Array<Sale>) => {
      this.sales = sales;
      sales.map(sale => {
        this.MonthTotal += sale.total
      });
    }).catch((err) => {
      
    });
  }
}
