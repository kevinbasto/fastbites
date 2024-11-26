import { Component, OnInit } from '@angular/core';
import { TableColumn } from '../../../core/generics/table-column';
import { salesTableHeaders } from './sales-table.headers';
import { TableConfig } from '../../../core/generics/table-config';
import { SalesService } from './sales.service';
import { Sale } from '../../../core/entities/sale';
import { Product } from '../../../core/entities/product';

@Component({
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.scss'
})
export class SalesComponent implements OnInit {
  title: string = "Listado de ventas del Día";
  data: Array<any> = [];
  headers: Array<TableColumn> = salesTableHeaders;
  size: number = 0;
  tableConfig: TableConfig = {
    create: false,
    pagination: false,
    ordersButton: false,
    options: false
  }
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
  date: string = "";
  total: number = 0
  earnings: number = 0;
  trendProduct : string = "";

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

  salesTitle: string = "Listado de ventas del Mes";
  sales?: Array<any>;
  salesHeaders: Array<TableColumn> = salesTableHeaders;
  MonthTotal = 0

  ngOnInit(): void {
    this.MonthTotal = 0;
    this.salesServ.fetchFromMonth()
      .then((sales: Array<Sale>) => {
        this.sales = sales;
        this.calculateMonthTotal(sales);
        this.CalculateEarnings(sales);
        this.calculateTrendProduct(sales);
      }).catch((err) => {

      });
  }

  private calculateMonthTotal(sales: Array<Sale>) {
    sales.map(sale => {
      this.MonthTotal += sale.total
    });
  }

  private calculateTrendProduct(sales: Array<Sale>){
    const productSalesMap: Map<string, { product: Partial<Product>; quantity: number }> = new Map();
    sales.forEach((sale) => {
      sale.items.forEach((item) => {
        const product = item.product;
        const quantity = item.quantity || 0;

        if (product && product.uuid) {
          if (productSalesMap.has(product.uuid)) {
            const existing = productSalesMap.get(product.uuid)!;
            existing.quantity += quantity;
          } else {
            productSalesMap.set(product.uuid, { product, quantity });
          }
        }
      });
    });
    let trendProduct: Partial<Product> | null = null;
    let maxQuantity = 0;

    productSalesMap.forEach((value) => {
      if (value.quantity > maxQuantity) {
        maxQuantity = value.quantity;
        trendProduct = value.product;
      }
    });

    this.trendProduct = trendProduct!.name!;
  }

  private CalculateEarnings(sales: Array<Sale>) {
    let totalEarnings = 0;

    sales.forEach((sale) => {
      sale.items.forEach((item) => {
        const product = item.product;
        const quantity = item.quantity || 0;

        if (product && product.cost !== undefined && product.price !== undefined) {
          const profitPerItem = product.price - product.cost;
          totalEarnings += profitPerItem * quantity;
        }
      });
    });

    this.earnings = totalEarnings;
  }
}
