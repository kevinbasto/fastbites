import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedComponentsModule } from '../../../shared-components/shared-components.module';
import { SharedFormsModule } from '../../../shared-forms/shared-forms.module';

import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxImageCompressService } from 'ngx-image-compress';

import { MenuRoutingModule } from './menu-routing.module';
import { MenuComponent } from './menu.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { SubmenusComponent } from './components/submenus/submenus.component';
import { CreateSubmenuComponent } from './routes/create-submenu/create-submenu.component';
import { EditSubmenuComponent } from './routes/edit-submenu/edit-submenu.component';
import { CreateCategoryComponent } from './routes/create-category/create-category.component';
import { EditCategoryComponent } from './routes/edit-category/edit-category.component';
import { CreateProductComponent } from './routes/create-product/create-product.component';
import { EditProductComponent } from './routes/edit-product/edit-product.component';
import { ViewCategoryComponent } from './dialogs/view-category/view-category.component';
import { ViewProductComponent } from './dialogs/view-product/view-product.component';
import { ViewSubmenuComponent } from './dialogs/view-submenu/view-submenu.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [
    MenuComponent,
    ProductsComponent,
    CategoriesComponent,
    SubmenusComponent,
    
    CreateProductComponent,
    EditProductComponent,
    CreateCategoryComponent,
    EditCategoryComponent,
    CreateSubmenuComponent,
    EditSubmenuComponent,

    ViewProductComponent,
    ViewCategoryComponent,
    ViewSubmenuComponent,
  ],
  imports: [
    CommonModule,
    MenuRoutingModule,
    SharedComponentsModule,
    SharedFormsModule,
    ReactiveFormsModule,
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
    MatButtonModule,
    MatTabsModule,
    MatSlideToggleModule
  ],
  providers: [
    NgxImageCompressService
  ]
})
export class MenuModule { }
