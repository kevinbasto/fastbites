import { Component, EventEmitter, Output } from '@angular/core';
import { Product } from '../../core/entities/product';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: "product-form",
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent {

  @Output() cancel: EventEmitter<null> = new EventEmitter()
  @Output() submitProduct : EventEmitter<Product> = new EventEmitter();

  form : FormGroup

  constructor(
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      
    })
  }

  submitProd(){}
}
