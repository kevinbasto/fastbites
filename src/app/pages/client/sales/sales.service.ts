import { Injectable } from '@angular/core';
import { Observable, timestamp } from 'rxjs';
import { Sale } from '../../../core/entities/sale';
import { SalesRepoService } from '../../../core/repos/sales-repo/sales-repo.service';
import { Timestamp } from '@angular/fire/firestore';
import { SnackbarService } from '../../../core/services/snackbar/snackbar.service';
import * as xlsx from 'xlsx';
import { CheckoutItem } from '../../../core/entities/checkout-item';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  sales$: Observable<Array<Sale>>

  constructor(
    private salesRepo: SalesRepoService,
    private snackbar: SnackbarService
  ) {
    this.sales$ = new Observable<Array<Sale>>((observer) => {
      this.salesRepo.sales$.subscribe(sales => {
        sales.map(sale => {
          if (sale.date instanceof Timestamp)
            sale.date = (sale.date as Timestamp).toDate();
        });
        observer.next(sales);
      });
    });
  }

  async fetchFromMonth() {
    try {
      let date = new Date();
      let year = date.getFullYear();
      let month: any = date.getMonth() + 1;
      month = month < 10 ? '0' + month : month;
      let daysInMonth = new Date(year, month, 0).getDate();
      let days = [];
      for (let day = 1; day <= daysInMonth; day++) {
        let dayString = day < 10 ? '0' + day : day;
        days.push(`${year}-${month}-${dayString}`);
      }
      let sales : Array<any> = []
      let promises : Array<Promise<Array<Sale>>> = []
      for (let day of days) 
        promises.push(this.salesRepo.fetchFromDate(day));
      let salesData : Array<Array<Sale>> = await Promise.all(promises);
      for(let sale of salesData)
        sales = [...sales, ...sale]
      
      sales.forEach(sale => {
        let date : Timestamp =  sale.date as any;
        sale.date = date.toDate()
      });
      return sales;
    } catch (error) {
      this.snackbar.openMessage("Nose pudo cargar el historial de ventas")
      throw error;
    }
  }

  exportToExcel(sales: Array<Partial<Sale>>) {
    let items : Array<any> = []
    for(let sale of sales){
      for(let item of sale.items!){
        let { name, date } = sale;
        let { quantity  } = item;
        let { price, cost, uuid } = item.product!;
        let prodname = item.product!.name;
        items.push({
          name, date, uuid, prodname, quantity, price, cost
        });
      }
    }
    
    const prodsws = xlsx.utils.json_to_sheet(items);
    const ws = xlsx.utils.json_to_sheet(sales);
    const wb = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Ventas');
    xlsx.utils.book_append_sheet(wb, prodsws, 'Productos');

    xlsx.writeFile(wb, 'ventas.xlsx');
  }
}
