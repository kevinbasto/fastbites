import { Injectable } from '@angular/core';
import { Category } from '../../entities/category';
import { MenuRepoService } from '../menu-repo/menu-repo.service';
import { AuthService } from '../../services/auth/auth.service';
import { v6 as uuid } from "uuid";

@Injectable({
  providedIn: 'root'
})
export class CategoriesRepoService {

  uid! : string;

  constructor(
    private menuRepo : MenuRepoService,
    private authServ: AuthService
  ) { }

  async createCategory(category: Category) {
    try {
      let uid = await this.authServ.getUID();
      category.id = uuid();
      let categories = (await this.menuRepo.fetchMenu(uid))?.categories;
      categories?.push(category);
      await this.menuRepo.updateMenu(uid, { categories });
    } catch (error) {
      throw error;
    }
  }

  async updateCategory(category: Category) {
    try {
      let uid : string = await this.authServ.getUID();
      let categories = (await this.menuRepo.fetchMenu(uid))?.categories;
      categories  = categories?.map((cat : Category) => {
        if(cat.id == category.id) cat = category;
        return cat;
      });
      await this.menuRepo.updateMenu(uid, { categories });
    } catch (error) {
      throw error;
    }
  }

  async deleteCategory(category: Category) {
    try {
      let uid = await this.authServ.getUID();
      let categories = (await this.menuRepo.fetchMenu(uid))?.categories;
      categories = categories?.filter((cat: Category) => cat.id != category.id);
      await this.menuRepo.updateMenu(uid, { categories });
    } catch (error) {
      throw error;
    }
  }
}
