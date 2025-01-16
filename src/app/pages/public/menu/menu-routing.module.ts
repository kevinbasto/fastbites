import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { CompanyProfileComponent } from './pages/company-profile/company-profile.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';

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
  },
  {
    path: "checkout",
    component: CheckoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
