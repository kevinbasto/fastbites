import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../core/entities/product';

@Component({
  selector: 'menu-item',
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.scss'
})
export class MenuItemComponent {

  @Input() product!: Product;

  @Output() itemSelected = new EventEmitter();
}
