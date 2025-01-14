import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu.component';

import { CreateProductComponent } from './routes/create-product/create-product.component';
import { EditProductComponent } from './routes/edit-product/edit-product.component';

import { CreateCategoryComponent } from './routes/create-category/create-category.component';
import { EditCategoryComponent } from './routes/edit-category/edit-category.component';

import { CreateSubmenuComponent } from './routes/create-submenu/create-submenu.component';
import { EditSubmenuComponent } from './routes/edit-submenu/edit-submenu.component';

const routes: Routes = [
  {
    path: "",
    component: MenuComponent
  },
  {
    path: "product/create",
    component: CreateProductComponent
  },
  {
    path: "product/:id",
    component: EditProductComponent
  },
  {
    path: "category/create",
    component: CreateCategoryComponent
  },
  {
    path: "category/:id",
    component: EditCategoryComponent
  },
  {
    path: 'submenu/create',
    component: CreateSubmenuComponent
  },
  {
    path: 'submenu/:id',
    component: EditSubmenuComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
