import { Injectable } from '@angular/core';
import { Order } from '../../../core/entities/order';
import { Observable } from 'rxjs';
import { OrdersRepoService } from '../../../core/repos/orders-repo/orders-repo.service';
import { MatDialog } from '@angular/material/dialog';
import { OrderVisualizerComponent } from '../../../shared-components/order-visualizer/order-visualizer.component';
import { Message } from '../../../core/generics/message';
import { ConfirmDialogComponent } from '../../../shared-components/confirm-dialog/confirm-dialog.component';
import { SalesRepoService } from '../../../core/repos/sales-repo/sales-repo.service';
import { SnackbarService } from '../../../core/services/snackbar/snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  orders$: Observable<Array<Order>>

  constructor(
    private ordersRepo: OrdersRepoService,
    private salesrepo: SalesRepoService,
    private snackbar: SnackbarService,
    private dialog: MatDialog
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

  detailOrder(order: Order) {
    const dialog = this.dialog.open(OrderVisualizerComponent, { data: {order} });
  }

  closeOrder(order: Order) {
    let message : Message = {
      name: '¿Confirmar Orden?',
      message: 'Una vez se confirme esta acción, la orden se cerrara y se guardara como venta'
    }
    const dialog = this.dialog.open(ConfirmDialogComponent, {data: {...message}})
    dialog.afterClosed().subscribe((confirmation : boolean) => {

    });
  }

  cancelOrder(order:Order) {
    let message : Message = {
      name: '¿Cancelar Orden?',
      message: 'Si presionas en cancelar orden, la orden será anotada como pérdida'
    }
    const dialog = this.dialog.open(ConfirmDialogComponent, {data: {...message}})
    dialog.afterClosed().subscribe((confirmation : boolean) => {
      this.ordersRepo.update({...order, active: false, status: "CANCELLED"})
      .then((result) => {
        this.snackbar.openMessage("Orden cancelada con éxito");
      }).catch((err) => {
        this.snackbar.openMessage("Hubo un error al procesar la operación");
      });
    });
  }
  
}
