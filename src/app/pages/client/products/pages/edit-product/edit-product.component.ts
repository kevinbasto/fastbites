import { Component, OnInit } from '@angular/core';
import { EditProductService } from './edit-product.service';
import { CroppedImage } from '../../../../../core/generics/cropped-image';
import { Product } from '../../../../../core/entities/product';
import { CropperPosition } from 'ngx-image-cropper';

@Component({
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss'
})
export class EditProductComponent implements OnInit{
  
  uploading: boolean = false;
  file?: File;
  cropped?: CroppedImage;
  rawUrl?: string = '';
  position?: CropperPosition;
  product!: Product;

  constructor(
    private editProductServ: EditProductService
  ) { }

  ngOnInit(): void {
    let data : Product = JSON.parse(window.localStorage.getItem("editProduct")!);
    this.rawUrl = data.rawImage;
    this.position = data.croppedPosition;
    this.product = data;
    
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
