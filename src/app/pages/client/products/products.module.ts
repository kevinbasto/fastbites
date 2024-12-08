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
import { NgxImageCompressService } from 'ngx-image-compress';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CreateCategoryComponent } from './dialogs/create-category/create-category.component';
import { EditCategoryComponent } from './dialogs/edit-category/edit-category.component';
import { ViewCategoryComponent } from './dialogs/view-category/view-category.component';


@NgModule({
  declarations: [
    ProductsComponent,
    CreateProductComponent,
    EditProductComponent,
    CreateCategoryComponent,
    EditCategoryComponent,
    ViewCategoryComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedComponentsModule,
    SharedFormsModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatPaginatorModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatButtonModule
  ],
  providers: [
    NgxImageCompressService
  ]
})
export class ProductsModule { }
