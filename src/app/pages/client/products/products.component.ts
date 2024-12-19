import { Component, OnInit } from '@angular/core';
import { TableColumn } from '../../../core/generics/table-column';
import { ProductsService } from './products.service';
import { categoriesTableConfig, categoriesTableHeaders, productTableHeaders } from './products-table.headers';
import { Product } from '../../../core/entities/product';
import { TableConfig } from '../../../core/generics/table-config';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Menu } from '../../../core/entities/menu';
import { Category } from '../../../core/entities/category';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {

  headers : Array<TableColumn> = productTableHeaders;
  tableConfig: TableConfig = categoriesTableConfig;
  productsCopy?: Array<Product>;
  products?: Array<Product>;
  menu! : Menu;
  
  shadow: boolean = false;
  form: FormGroup

  constructor(
    private productsService: ProductsService,
    private breakpoint: BreakpointObserver,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.breakpoint.observe(['(max-width: 600px)'])
    .subscribe((bs: BreakpointState) => this.shadow = bs.matches);
    this.form = this.fb.group({
      category: [""]
    });
  }

  ngOnInit(): void {
    this.fetchMenu()
    this.form.get("category")?.valueChanges
    .subscribe((categoryId : string) => {
      if(categoryId == ""){
        this.products = structuredClone(this.productsCopy);
        return;
      }
      let foundCategory: Category;
      for(let category of this.categories!)
        if(category.id == categoryId)
          foundCategory = category;
      this.filterProductsByCategory(foundCategory!);
    });
  }

  fetchMenu(){
    this.productsService.fetchMenu()
    .then((menu : Menu) => {
      let { products, categories } = menu;
      this.products = products;
      this.productsCopy = products;
      this.categories = categories;
      this.menu = menu;
    });
  }

  createProduct() {
    this.router.navigate(['/client/products/create']);
  }

  filterProductsByCategory(category : Category) {
    let products = this.productsService.filterProductsByCategory(category, this.productsCopy!);
    this.products = products;
  }

  importProductsFromFile() {
    this.productsService.importProductsFromFile()
    .then((result) => {
      this.fetchMenu();
    }).catch((err) => {
      
    });
  }

  viewQrDialog() {
    this.productsService.viewQrDialog();
  }

  editProduct(product: Product) {
    this.router.navigate([`/client/products/${product.id}`]);
  }

  viewProduct(product: Product) {
    this.productsService.viewProduct(product);
  }

  deleteProduct(product: Product) {
    this.productsService.deleteProduct(product)
    .then((result) => this.fetchMenu());
  }

  toggleProduct(product: Product) {
    this.productsService.toggleProduct(product);
  }

  categories?: Array<Category>;
  categoriesHeaders = categoriesTableHeaders;
  categoriesConfig = categoriesTableConfig;

  createCategory() {
    this.productsService.createCategory()
    .then((result) => this.fetchMenu());
  }

  viewCategory(category: Category) {
    this.productsService.viewCategory(category);
  }

  editCategory(category: Category) {
    this.productsService.editCategory(category)
    .then((result) => this.fetchMenu());
  }

  deleteCategory(category : Category) {
    this.productsService.deleteCategory(category)
    .then(() => this.fetchMenu());
  }
  
}
