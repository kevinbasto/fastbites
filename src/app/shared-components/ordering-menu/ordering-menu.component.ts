import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../core/entities/product';

@Component({
  selector: 'ordering-menu',
  templateUrl: './ordering-menu.component.html',
  styleUrl: './ordering-menu.component.scss'
})
export class OrderingMenuComponent {

  @Input() products?: Array<Product>;
  @Output() prod: EventEmitter<Product> = new EventEmitter();

  constructor() {}
}
