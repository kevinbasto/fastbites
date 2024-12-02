import { Component, OnInit } from '@angular/core';
import { CreateProductService } from './create-product.service';
import { Product } from '../../../../../core/entities/product';
import { CroppedImage } from '../../../../../core/generics/cropped-image';
import { Router } from '@angular/router';

@Component({
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss'
})
export class CreateProductComponent implements OnInit{

  uploading: boolean = false;
  file?: File;
  cropped?: CroppedImage;

  constructor(
    private createProductServ: CreateProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createProductServ.fetchFromMenuDocument()
    .then((result) => {
      console.log(result);
    }).catch((err) => {
      
    });
  }

  cancel() {
    this.router.navigate([`/client/products`]);
  }

  createProduct(product: Product) {
    this.uploading = !this.uploading;
    this.createProductServ.createProduct(product, this.file!, this.cropped!)
      .finally(() => {
        this.uploading = !this.uploading;
      })
  }

}
