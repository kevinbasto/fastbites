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
      menu.products = menu.products.map(product => {
        if(product.id == updatedProduct.id) 
          product = updatedProduct;
        return product;
      });
      await this.menuRepo.updateMenu(uid, menu);
    } catch (error) {
      throw error;
    }
  }

  async deleteProduct(uid: string, deletedProduct: Product) {
    try {
      let { products } = await this.menuRepo.fetchMenu(uid) as Menu;
      products = products.filter(product => product.id != deletedProduct.id);
      await this.menuRepo.updateMenu(uid, { products });
    } catch (error) {
      throw error;
    }
  }
}
