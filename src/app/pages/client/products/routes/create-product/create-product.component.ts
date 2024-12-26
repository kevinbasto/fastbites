import { Component, OnInit } from '@angular/core';
import { CreateProductService } from './create-product.service';
import { Product } from '../../../../../core/entities/product';
import { CroppedImage } from '../../../../../core/generics/cropped-image';
import { Router } from '@angular/router';
import { Menu } from '../../../../../core/entities/menu';
import { Category } from '../../../../../core/entities/category';

@Component({
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss'
})
export class CreateProductComponent implements OnInit{

  uploading: boolean = false;
  file?: File;
  cropped?: CroppedImage;
  categories?: Array<Category>;

  constructor(
    private createProductServ: CreateProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createProductServ.fetchFromMenuDocument()
    .then((menu: Menu) => {
      let { categories } = menu;
      this.categories = categories;
    }).catch((err) => {
      
    });
  }

  cancel() {
    this.router.navigate([`/client/products`]);
  }

  createProduct(product: Product) {
    this.uploading = !this.uploading;
    this.createProductServ.createProduct(product, this.file!, this.cropped!)
      .finally(() => this.uploading = !this.uploading);
  }

}
