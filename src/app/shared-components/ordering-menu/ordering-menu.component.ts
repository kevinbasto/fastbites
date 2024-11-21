import { Component, Input } from '@angular/core';
import { Product } from '../../core/entities/product';

@Component({
  selector: 'ordering-menu',
  templateUrl: './ordering-menu.component.html',
  styleUrl: './ordering-menu.component.scss'
})
export class OrderingMenuComponent {

  @Input() products?: Array<Product>;

  constructor() {}
}
