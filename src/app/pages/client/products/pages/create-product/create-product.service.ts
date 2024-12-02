import { Injectable } from '@angular/core';
import { Product } from '../../../../../core/entities/product';
import { CroppedImage } from '../../../../../core/generics/cropped-image';
import { MenuRepoService } from '../../../../../core/repos/menu-repo/menu-repo.service';
import { Menu } from '../../../../../core/entities/menu';
import { AuthService } from '../../../../../core/services/auth/auth.service';
import { MatDialog } from '@angular/material/dialog';


@Injectable({
  providedIn: 'root'
})
export class CreateProductService {

  menu! : Menu;

  constructor(
    private menuRepo: MenuRepoService,
    private authServ: AuthService,
    private dialog : MatDialog
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
    
  }


}
