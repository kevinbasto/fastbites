import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductsRepoService } from '../../../../../core/repos/products-repo/products-repo.service';
import { Product } from '../../../../../core/entities/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private matDialog: MatDialog,
    private productRepo: ProductsRepoService
  ) { }

  visualizeProduct(product: Product) {}

  deleteProduct(product: Product) {}

  toggleProduct(producT: Product) {}
}
