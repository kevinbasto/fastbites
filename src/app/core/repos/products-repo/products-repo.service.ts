import { Injectable } from '@angular/core';
import { MenuRepoService } from '../menu-repo/menu-repo.service';
import { Product } from '../../entities/product';
import { Menu } from '../../entities/menu';

@Injectable({
  providedIn: 'root'
})
export class ProductsRepoService {

  constructor(
    private menuRepo : MenuRepoService
  ) {}

  async createProduct(uid: string, product: Product){
    try {
      let menu: Menu = await this.menuRepo.fetchMenu(uid) as Menu;
      menu.products.push(product)
      await this.menuRepo.updateMenu(uid, menu);
    } catch (error) {
      throw error;
    }
  }

  async updateProduct(uid: string, updatedProduct: Product) {
    try {
      let menu: Menu = await this.menuRepo.fetchMenu(uid) as Menu;
      for(let product of menu.products)
        if(product.id == product.id) product = updatedProduct;
      await this.menuRepo.updateMenu(uid, menu);

    } catch (error) {
      throw error;
    }
  }
}
