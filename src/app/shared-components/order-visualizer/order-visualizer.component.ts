import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Order } from '../../core/entities/order';

@Component({
  selector: 'app-order-visualizer',
  templateUrl: './order-visualizer.component.html',
  styleUrl: './order-visualizer.component.scss'
})
export class OrderVisualizerComponent {

  order: Order

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { order: Order },
    public dialogRef: MatDialogRef<OrderVisualizerComponent>
  ) {
    this.order = this.data.order
  }

}
