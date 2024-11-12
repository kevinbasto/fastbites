import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Product } from '../../core/entities/product';
import { FormBuilder, FormGroup } from '@angular/forms';

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
      name: [""],
      description: [""],
      cost: [0],
      price: [0],
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
    console.log(product);
    this.submitProduct.emit(product);
  }
}
