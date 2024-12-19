import { Component, OnInit } from '@angular/core';
import { TableColumn } from '../../../core/generics/table-column';
import { salesTableconfig, salesTableHeaders } from './sales-table.headers';
import { TableConfig } from '../../../core/generics/table-config';
import { SalesService } from './sales.service';
import { Sale } from '../../../core/entities/sale';
import { Product } from '../../../core/entities/product';
import { CheckoutItem } from '../../../core/entities/checkout-item';
import { Months } from './sales-data';

@Component({
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.scss'
})
export class SalesComponent implements OnInit {
  title: string = "Listado de ventas del Día";
  data: Array<any> = [];
  headers: Array<TableColumn> = salesTableHeaders;
  size: number = 0;
  tableConfig: TableConfig = salesTableconfig
  months = Months
  date: string = "";
  total: number = 0
  earnings: number = 0;
  trendProduct: string = "";
  salesHistoryMode : "week" | "month" | "year" = "week"

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
        this.debriefSales(sales);
        this.setDates()
        this.calculateDailySales(sales);
      }).catch((err) => {

      });
  }

  private calculateMonthTotal(sales: Array<Sale>) {
    sales.map(sale => {
      this.MonthTotal += sale.total
    });
  }

  private calculateTrendProduct(sales: Array<Sale>) {
    const productSalesMap: Map<string, { product: Partial<Product>; quantity: number }> = new Map();
    sales.forEach((sale) => {
      sale.items.forEach((item) => {
        const product = item.product;
        const quantity = item.quantity || 0;

        if (product && product.id) {
          if (productSalesMap.has(product.id)) {
            const existing = productSalesMap.get(product.id)!;
            existing.quantity += quantity;
          } else {
            productSalesMap.set(product.id, { product, quantity });
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

  labels: Array<string> = []

  setDates() {
    let year = (new Date()).getFullYear();
    let month: number = (new Date()).getMonth();
    let dates: Array<string> = []
    for (let day = 1; day <= 32; day++) {
      let date = new Date(year, month, day);
      let newmonth = date.getMonth()
      if (isNaN(date.getTime()))
        break;
      else if (newmonth == month)
        dates.push(`${year}-${month + 1}-${day}`);
    }
    this.labels = dates;
  }

  dailySales: Array<number> = []

  calculateDailySales(sales: Array<Sale>) {
    const dailySales: Array<Array<Sale>> = [];
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();

    // Iterate through all the days of the month
    for (let day = 1; day <= 31; day++) {
      const date = new Date(currentYear, currentMonth, day);

      // Stop if the date is invalid (e.g., Feb 30, Apr 31)
      if (isNaN(date.getTime()) || date.getMonth() !== currentMonth) {
        break;
      }

      // Filter sales that match the current day
      const salesForDay = sales.filter((sale) => {
        const saleDate = new Date(sale.date as Date);
        return (
          saleDate.getFullYear() === currentYear &&
          saleDate.getMonth() === currentMonth &&
          saleDate.getDate() === day
        );
      });

      // Add to daily sales array
      dailySales.push(salesForDay);
    }
    let dailyCalculation : Array<number> = []
    for(let sale of dailySales) {
      let calculation = this.calculateDayTotal(sale);
      dailyCalculation.push(calculation)
    }
    this.dailySales = dailyCalculation;
  }

  private calculateDayTotal(sales: Array<Sale>) {
    let total = 0
    sales.map(sale => {
      total += sale.total
    });
    return total;
  }

  brief?: Array<{product: Product, quantity: number}>;

  private debriefSales(sales: Array<Sale>) {
    let items: Array<Partial<CheckoutItem>> = [];
    
    for (let sale of sales) {
        items = [...items, ...sale.items];
    }
    
    const productTotals = new Map<string, { product: Partial<Product>, quantity: number }>();

    for (let item of items) {
        const productId = item.product?.id;
        if (productId) {
            if (!productTotals.has(productId)) {
                productTotals.set(productId, { product: item.product!, quantity: 0 });
            }
            const current = productTotals.get(productId)!;
            current.quantity += item.quantity ?? 0;
        }
    }

  let brief = Array.from(productTotals.values());
  this.brief = brief as any;
}

  exportToExcel() {
    this.salesServ.exportToExcel(this.sales!);
  }

}
