import { Component } from '@angular/core';
import { CreateProductService } from './create-product.service';

@Component({
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss'
})
export class CreateProductComponent {

  constructor(
    private createProductServ: CreateProductService
  ) {}

  cancel() {
    this.createProductServ.goBack();
  }

  createProduct() {}
  
}
