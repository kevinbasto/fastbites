import { Injectable } from '@angular/core';
import { Category } from '../../entities/category';
import { MenuRepoService } from '../menu-repo/menu-repo.service';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesRepoService {

  uid! : string;

  constructor(
    private menuRepo : MenuRepoService,
    private authServ: AuthService
  ) { }

  async createCategory(category: Category) {}

  async updateCategory(category: Category) {}

  async deleteCategory(category: Category) {}
}
