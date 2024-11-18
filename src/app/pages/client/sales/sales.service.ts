import { Injectable } from '@angular/core';
import { Observable, timestamp } from 'rxjs';
import { Sale } from '../../../core/entities/sale';
import { SalesRepoService } from '../../../core/repos/sales-repo/sales-repo.service';
import { Timestamp } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  sales$ : Observable<Array<Sale>>

  constructor(
    private salesRepo : SalesRepoService
  ) {
    this.sales$ = new Observable<Array<Sale>>((observer) => {
      this.salesRepo.sales$.subscribe(sales => {
        sales.map(sale => {
          if(sale.date instanceof Timestamp)
            sale.date = (sale.date as Timestamp).toDate();
        });
        observer.next(sales);
      });
    });
  }
}
