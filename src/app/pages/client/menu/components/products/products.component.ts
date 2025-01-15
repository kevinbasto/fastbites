import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ProductsService } from './products.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Category } from '../../../../../core/entities/category';
import { Router } from '@angular/router';
import { Product } from '../../../../../core/entities/product';
import { productsTableConfig, productTableHeaders } from './products-table.headers';
import { environment } from '../../../../../../environments/environment';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit, OnChanges {

  form: FormGroup

  @Input() products?: Array<Product>;
  @Input() categories?: Array<Category> = [];

  headers = productTableHeaders;
  tableConfig = productsTableConfig;
  options = environment.paginationOptions;
  size = environment.defaultPageSize;
  displayProducts?: Array<Product>;
  filteredProducts?: Array<Product>;

  constructor(
    private productsService: ProductsService,
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.form = this.fb.group({
      name: [""],
      category: [""]
    });
  }

  ngOnInit(): void {
    this.form.valueChanges.subscribe((value) => {
      this.filteredProducts = this.products?.filter((product) => {
        const matchesCategory = value.category === "" || product.category === value.category;
        const matchesName = value.name === "" || product.name.toLowerCase().includes(value.name.toLowerCase());
        return matchesCategory && matchesName;
      });
      this.setPage();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['products'] && this.products){
      this.setPage()
    }
  }

  createProduct() {
    this.router.navigate(['/client/menu/product/create']);
  }

  editProduct(product: Product) {
    console.log(product)
    this.router.navigate([`/client/menu/product/${product.id}`]);
  }

  viewProduct(product: Product) {
    this.productsService.visualizeProduct(product)
  }

  deleteProduct(product: Product) {
    this.productsService.deleteProduct(product);
  }

  toggleProduct(product: Product) {
    this.productsService.toggleProduct(product);
  }

  setPage() {
    this.displayProducts = [];
    const productsToDisplay = this.filteredProducts || this.products || [];
    for(let i = 0; i < this.size; i++) {
      if(i < productsToDisplay.length)
        this.displayProducts.push(productsToDisplay[i])
    }
  }

  changePage(page: PageEvent) {
    const startIndex = page.pageIndex * page.pageSize;
    const endIndex = startIndex + page.pageSize;
    this.displayProducts = this.filteredProducts?.slice(startIndex, endIndex) || [];
  }
}