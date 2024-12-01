import { Injectable } from '@angular/core';
import { AuthService } from '../../../../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { SnackbarService } from '../../../../../core/services/snackbar/snackbar.service';
import { Product } from '../../../../../core/entities/product';
import { CroppedImage } from '../../../../../core/generics/cropped-image';
import { ProductsRepoService } from '../../../../../core/repos/products-repo/products-repo.service';
import { ImagesService } from '../../../../../core/services/images/images.service';

@Injectable({
  providedIn: 'root'
})
export class EditProductService {

  constructor(
    private auth: AuthService,
    private router : Router,
    private snackbar: SnackbarService,
    private productCrud: ProductsRepoService,
    private imagesServ: ImagesService
  ) { }

  goBack(){
    this.router.navigate([`/client/products`]);
  }

  async updateProduct(product: Product, image?: File, cropped?: CroppedImage){
    // try {
    //   let uid = await this.auth.getUID() as string;
    //   let { uuid } = product;
    //   if(image)
    //     product.rawImage = await this.uploadImage(image, uid, uuid);
    //   if(cropped){
    //     product.croppedImage = await this.uploadCroppedImage(cropped, uid, uuid);
    //     product.croppedPosition = cropped.position;
    //   }
    //   await this.productCrud.updateProduct(product, uid, uuid);
    //   this.snackbar.openMessage("Producto actualizado con éxito");
    //   this.router.navigate([`/client/products`]);
    // } catch (error) {
    //   console.log(error);
    //   throw error;
    // }
  }

  async uploadImage(file: File, uid: string, uuid: string) : Promise<string> {
    try {
      file = await this.imagesServ.prepareImage(`${uuid}-raw`, file)
      let url = await this.imagesServ.uploadImage(`/${uid}/${uuid}`, file);
      return url;
    } catch (error) {
      throw error;
    }
  }

  async uploadCroppedImage(cropped: CroppedImage, uid: string, uuid: string) : Promise<string> {
    try {
      cropped.image = await this.imagesServ.prepareImage(`${uuid}-cropped`, cropped.image);
      cropped.image = await this.imagesServ.compressImage(cropped.image);
      let url = await this.imagesServ.uploadImage(`/${uid}/${uuid}`, cropped.image);
      return url;
    } catch (error) {
      throw error;
    }
  }
}
