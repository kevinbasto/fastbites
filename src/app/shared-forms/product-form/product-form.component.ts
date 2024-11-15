import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Product } from '../../core/entities/product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: "product-form",
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent implements OnChanges {

  @Output() cancel: EventEmitter<null> = new EventEmitter()
  @Output() submitProduct : EventEmitter<Product> = new EventEmitter();
  @Output() file: EventEmitter<File> = new EventEmitter();

  @Input() uploading?: boolean;
  @Input() product?: Product;
  

  form : FormGroup

  constructor(
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      name: ["", [Validators.required]],
      description: ["", [Validators.required]],
      cost: [0, [Validators.required, Validators.min(0)]],
      price: [0, [Validators.required, Validators.min(1)]],
      available: [false]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['product'] && this.product){
      let {name, description, cost, price, available } = this.product;
      this.form.setValue({ name, description, cost, price, available });
    }
  }

  submitProd(){
    let product: Product = this.form.value;
    this.submitProduct.emit(product);
  }
}
