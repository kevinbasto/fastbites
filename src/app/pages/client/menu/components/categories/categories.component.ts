import { Component, Input } from '@angular/core';
import { Category } from '../../../../../core/entities/category';
import { categoriesTableConfig, categoriesTableHeaders } from './categories-table.headers';
import { CategoriesService } from './categories.service';
import { environment } from '../../../../../../environments/environment';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {

  @Input() categories?: Array<Category>;
  categoriesHeaders = categoriesTableHeaders;
  categoriesConfig = categoriesTableConfig;
  options = environment.paginationOptions
  size = environment.defaultPageSize;
  displayCategories: Array<Category> = [];

  constructor(
    private router: Router,
    private categoriesService: CategoriesService
  ) { }

  createCategory() { 
    this.router.navigate(['/client/menu/category/create']);
  }

  editCategory(category: Category) {
    this.router.navigate([`/client/menu/category/${category.id}`]);
  }

  viewCategory(category: Category) {
    this.categoriesService.viewCategory(category);
  }

  deleteCategory(category: Category) {
    this.categoriesService.deleteCategory(category);
  }

  toggleCategory(category: Category) {
    this.categoriesService.toggleCategory(category);
  }

  setPage() {
    for (let i = 0; i < this.size; i++) {
      if (i < this.categories!.length)
        this.displayCategories.push(this.categories![i])
    }
  }

  changePage(page: PageEvent) {
    const startIndex = page.pageIndex * page.pageSize;
    const endIndex = startIndex + page.pageSize;
    this.displayCategories = this.categories?.slice(startIndex, endIndex) || [];
  }
}
