import { Component, Input } from '@angular/core';
import { Category } from '../../../../../core/entities/category';
import { categoriesTableConfig, categoriesTableHeaders } from './categories-table.headers';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {

  @Input() categories?: Array<Category>;
  categoriesHeaders = categoriesTableHeaders;
  categoriesConfig = categoriesTableConfig;

  createCategory() {
    // this.productsService.createCategory()
    // .then((result) => this.fetchMenu());
  }

  viewCategory(category: Category) {
    // this.productsService.viewCategory(category);
  }

  editCategory(category: Category) {
    // this.productsService.editCategory(category)
    // .then((result) => this.fetchMenu());
  }

  deleteCategory(category : Category) {
    // this.productsService.deleteCategory(category)
    // .then(() => this.fetchMenu());
  }
}
