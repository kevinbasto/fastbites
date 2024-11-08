import { Component } from '@angular/core';
import { CreateProductService } from './create-product.service';

@Component({
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss'
})
export class CreateProductComponent {

  constructor(
    createProductServ: CreateProductService
  ) {}

  cancel() {}

  createProduct() {}
  
}
