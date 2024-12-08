import { Injectable } from '@angular/core';
import { Product } from '../../../../../core/entities/product';
import { CroppedImage } from '../../../../../core/generics/cropped-image';
import { MenuRepoService } from '../../../../../core/repos/menu-repo/menu-repo.service';
import { Menu } from '../../../../../core/entities/menu';
import { AuthService } from '../../../../../core/services/auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { v6 as uuid } from "uuid";
import { ProductsRepoService } from '../../../../../core/repos/products-repo/products-repo.service';
import { ImagesService } from '../../../../../core/services/images/images.service';


@Injectable({
  providedIn: 'root'
})
export class CreateProductService {

  menu! : Menu;

  constructor(
    private menuRepo: MenuRepoService,
    private productRepo: ProductsRepoService,
    private imagesService: ImagesService,
    private authServ: AuthService,
  ) { }

  async fetchFromMenuDocument() : Promise<Menu> {
    try {
      let uid = await this.authServ.getUID();
      let menu : Menu = await this.menuRepo.fetchMenu(uid) as Menu;
      return menu;
    } catch (error) {
      throw error;
    }
  }

  /**
   * se toma el producto, se le agrega un uuid,
   * se comprime el archivo cropped
   * se les asigna el uuid a las imagenes y al producto se le agrega las coordenadas del cropping
   * se envia la información a firestore
   * si la category asignada no existe, se crea una nueva category
   * se retorna un success
   */
  async createProduct(product: Product, image: File, cropped: CroppedImage) {
    try {
      let uid = await this.authServ.getUID();
      product.id = uuid();
      let { id } = product;
      let format = image.name.split(".")[image.name.split(".").length - 1];
      let newFile = new File([await image.arrayBuffer()], `${id}.${format}`);
      let raw = await this.imagesService.uploadImage(uid, newFile);
      product.rawImage = raw;
      format = cropped.image.name.split(".")[cropped.image.name.split(".").length - 1];
      let newCropped = new File([await cropped.image.arrayBuffer()], `${id}.${format}`);
      newCropped = await this.imagesService.compressImage(newCropped);
      let croppedurl = await this.imagesService.uploadImage(uid, newCropped);
      product.croppedImage = croppedurl;
      product.croppedPosition = cropped.position;
      await this.productRepo.createProduct(uid, product);
    } catch (error) {
      throw error;
    }
  }


}
