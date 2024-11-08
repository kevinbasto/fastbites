import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: "product-form",
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent {

  @Output() cancel: EventEmitter<null> = new EventEmitter()
}
