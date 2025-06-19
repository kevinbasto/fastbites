import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../core/entities/product';
import { Personalization } from '../../core/entities/personalization';

@Component({
  selector: 'menu-item',
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.scss'
,
  standalone: false})
export class MenuItemComponent {

  @Input() personalization?: Personalization;
  @Input() product!: Product;

  @Output() itemSelected : EventEmitter<Product> = new EventEmitter();
  @Output() orderItem: EventEmitter<Product> = new EventEmitter();
}
