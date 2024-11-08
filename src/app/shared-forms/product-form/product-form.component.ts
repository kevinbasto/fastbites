import { Component, EventEmitter, Input, Output } from '@angular/core';
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

  @Input() uploading?: boolean;
  

  form : FormGroup

  constructor(
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      name: [""],
      description: [""],
      cost: [0],
      price: [0],
      available: [false]
    });
  }

  submitProd(){
    let product: Product = this.form.value;
    console.log(product);
    this.submitProduct.emit(product);
  }
}
