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
import { SharedFormsModule } from '../../../shared-forms/shared-forms.module';

import { ImageCropperComponent } from "ngx-image-cropper";

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
    SharedFormsModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    ImageCropperComponent,
  ]
})
export class ProductsModule { }
