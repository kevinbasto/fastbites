import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { CompanyProfileComponent } from './pages/company-profile/company-profile.component';

const routes: Routes = [
  {
    path: "",
    component: MenuComponent
  },
  {
    path: "product/:id",
    component: ProductDetailComponent
  },
  {
    path: "about",
    component: CompanyProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
