import { Injectable } from '@angular/core';
import { Category } from '../../entities/category';
import { Product } from '../../entities/product';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MenuRepoService {

  constructor(
    private auth: AuthService
  ) { }

  async createProduct(product: Product) {}

  async createCategory(category: Category) {}

  async fetchMenu(uid: string) {}

  async updateProduct(product: Product) {}

  async updateCategory(category: Category) {}

  async deleteProduct(product: Product) {}

  async deleteCategory(category: Category) {}
}
