import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products.component';
import { CreateProductComponent } from './routes/create-product/create-product.component';
import { EditProductComponent } from './routes/edit-product/edit-product.component';
import { CreateSubmenuComponent } from './routes/create-submenu/create-submenu.component';
import { EditSubmenuComponent } from './routes/edit-submenu/edit-submenu.component';

const routes: Routes = [
  {
    path: "",
    component: ProductsComponent
  },
  {
    path: "create",
    component: CreateProductComponent
  },
  {
    path: ":id",
    component: EditProductComponent
  },
  {
    path: 'submenu/create',
    component: CreateSubmenuComponent
  },
  {
    path: 'submenu/edit/:id',
    component: EditSubmenuComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
