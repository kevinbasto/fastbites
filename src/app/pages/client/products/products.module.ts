import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';

import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { SharedComponentsModule } from '../../../shared-components/shared-components.module';
import { CreateProductComponent } from './pages/create-product/create-product.component';
import { EditProductComponent } from './pages/edit-product/edit-product.component';



@NgModule({
  declarations: [
    ProductsComponent,
    CreateProductComponent,
    EditProductComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedComponentsModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule
  ]
})
export class ProductsModule { }
