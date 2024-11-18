import { Injectable } from '@angular/core';
import { Order } from '../../../core/entities/order';
import { Observable } from 'rxjs';
import { OrdersRepoService } from '../../../core/repos/orders-repo/orders-repo.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  orders$: Observable<Array<Order>>

  constructor(
    private ordersRepo: OrdersRepoService
  ) {
    this.orders$ = new Observable<Array<Order>>((observer) => {
      this.ordersRepo.find()
      .then((result : Observable<Array<Order>>) => {
        result.subscribe(orders => {
          observer.next(orders)
        })
      }).catch((err) => {
        observer.error(err);
      });
    });
  }
}
