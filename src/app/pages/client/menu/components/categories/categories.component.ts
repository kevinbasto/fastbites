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

  createCategory() { }

  viewCategory(category: Category) { }

  editCategory(category: Category) { }

  deleteCategory(category : Category) { }
}
