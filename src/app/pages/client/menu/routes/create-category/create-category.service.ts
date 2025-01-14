import { Injectable } from '@angular/core';
import { Category } from '../../../../../core/entities/category';
import { CategoriesRepoService } from '../../../../../core/repos/categories-repo/categories-repo.service';

@Injectable({
  providedIn: 'root'
})
export class CreateCategoryService {

  constructor(
    private categoryRepo: CategoriesRepoService
  ) { }

  async createNewCategory(category: Category) {
    return this.categoryRepo.createCategory(category);
  }
}
