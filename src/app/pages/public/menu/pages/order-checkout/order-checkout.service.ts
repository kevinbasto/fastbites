import { Injectable } from '@angular/core';
import { Order } from '../../../../../core/entities/order';
import { OrdersRepoService } from '../../../../../core/repos/orders-repo/orders-repo.service';

@Injectable({
  providedIn: 'root'
})
export class OrderCheckoutService {

  constructor(
    private ordersRepo: OrdersRepoService
  ) { }

  async createOrder(order: Partial<Order>, id : string) {
    return this.ordersRepo.create(order as Order, id);
  }
}
