import { Component } from '@angular/core';
import { CreateProductService } from './create-product.service';
import { Product } from '../../../../../core/entities/product';

@Component({
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss'
})
export class CreateProductComponent {

  uploading: boolean = false;

  constructor(
    private createProductServ: CreateProductService
  ) {}

  cancel() {
    this.createProductServ.goBack();
  }

  createProduct(product : Product) {
    this.uploading = !this.uploading;
    this.createProductServ.createProduct(product)
    .finally(() => {
      this.uploading = !this.uploading;
    })
  }
  
}
