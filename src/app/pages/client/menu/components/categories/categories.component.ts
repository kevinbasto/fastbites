import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
,
  standalone: false})
export class CategoriesComponent implements OnInit, OnChanges {

  form: FormGroup;

  @Input() categories?: Array<Category>;
  categoriesHeaders = categoriesTableHeaders;
  categoriesConfig = categoriesTableConfig;
  options = environment.paginationOptions;
  size = environment.defaultPageSize;
  displayCategories: Array<Category> = [];
  filteredCategories?: Array<Category>;

  constructor(
    private router: Router,
    private categoriesService: CategoriesService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      name: [""]
    });
  }

  ngOnInit(): void {
    this.form.valueChanges.subscribe((value) => {
      this.filteredCategories = this.categories?.filter((category) => {
        const matchesName = value.name === "" || category.name.toLowerCase().includes(value.name.toLowerCase());
        return matchesName;
      });
      this.setPage();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['categories'] && this.categories) {
      this.setPage();
    }
  }

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
    this.displayCategories = [];
    const categoriesToDisplay = this.filteredCategories || this.categories || [];
    for (let i = 0; i < this.size; i++) {
      if (i < categoriesToDisplay.length)
        this.displayCategories.push(categoriesToDisplay[i]);
    }
  }

  changePage(page: PageEvent) {
    const startIndex = page.pageIndex * page.pageSize;
    const endIndex = startIndex + page.pageSize;
    if(this.form.value.name) 
      this.displayCategories = this.filteredCategories?.slice(startIndex, endIndex) || [];
    else
      this.displayCategories = this.categories?.slice(startIndex, endIndex) || [];
  }
}