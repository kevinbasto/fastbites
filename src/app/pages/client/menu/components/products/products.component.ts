import { Component, Input, OnInit } from '@angular/core';
import { ProductsService } from './products.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Category } from '../../../../../core/entities/category';
import { Router } from '@angular/router';
import { Product } from '../../../../../core/entities/product';
import { productsTableConfig, productTableHeaders } from './products-table.headers';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {

  form: FormGroup

  @Input() products?: Array<Product>;
  headers = productTableHeaders;
  tableConfig = productsTableConfig;
  categories: Array<Category> = [];
  

  constructor(
    private productsService: ProductsService,
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.form = this.fb.group({
      category: [""]
    });
  }

  ngOnInit(): void {

  }

  viewQrDialog() {
    // this.productsService.viewQrDialog();
  }

  importProductsFromFile() {
    // this.productsService.importProductsFromFile()
    // .then((result) => {
    //   this.fetchMenu();
    // }).catch((err) => {
      
    // });
  }

  createProduct() {
    this.router.navigate(['/client/products/create']);
  }

  editProduct(product: Product) {
    this.router.navigate([`/client/products/${product.id}`]);
  }

  viewProduct(product: Product) {
    // this.productsService.viewProduct(product);
  }

  deleteProduct(product: Product) {
    // this.productsService.deleteProduct(product)
      // .then((result) => this.fetchMenu());
  }

  toggleProduct(product: Product) {
    // this.productsService.toggleProduct(product);
  }

}
