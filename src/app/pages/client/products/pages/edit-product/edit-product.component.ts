import { Component, OnInit } from '@angular/core';
import { EditProductService } from './edit-product.service';
import { CroppedImage } from '../../../../../core/generics/cropped-image';
import { Product } from '../../../../../core/entities/product';
import { CropperPosition } from 'ngx-image-cropper';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../../../../../core/entities/category';
import { Menu } from '../../../../../core/entities/menu';

@Component({
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss'
})
export class EditProductComponent implements OnInit{
  
  id!: string;
  uploading: boolean = false;
  file?: File;
  cropped?: CroppedImage;
  rawUrl?: string = '';
  position?: CropperPosition;
  product!: Product;
  categories?: Array<Category>;

  constructor(
    private editProductServ: EditProductService,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe((params) => this.id = params.get("id") as string);
  }

  ngOnInit(): void {
    this.editProductServ.fetchMenu()
    .then((menu : Menu) => {
      this.categories = menu.categories;
      for(let product of menu.products)
        if(product.id == this.id)
          this.product = product;
      this.position = this.product.croppedPosition;
      this.rawUrl = this.product.rawImage;
    });
  }

  cancel() {
    this.editProductServ.goBack();
  }

  editProduct(product: Product) {
    this.uploading = !this.uploading;
    this.editProductServ.updateProduct({...this.product, ...product}, this.file!, this.cropped!)
      .finally(() => {
        this.uploading = !this.uploading;
      })
  }

}
