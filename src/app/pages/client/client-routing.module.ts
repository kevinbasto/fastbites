import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path: "",
  //   redirectTo: "products",
  //   pathMatch: "full"
  // },
  {
    path: "products",
    loadChildren: () => import('./products/products.module').then(m => m.ProductsModule)
  },
  {
    path: "orders",
    loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule)
  },
  {
    path: "sales",
    loadChildren: () => import('./sales/sales.module').then(m => m.SalesModule)
  },
  {
    path: "settings",
    loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule)
  },
  {
    path: "menu",
    loadChildren: () => import('./order-slip/order-slip.module').then(m => m.OrderSlipModule)
  },
  // {
  //   path: "personalization",
  //   loadChildren: () => import('./personalization/personalization.module').then(m => m.PersonalizationModule)
  // },
  // {
  //   path: "promos",
  //   loadChildren: () => import('./promotions/promotions.module').then(m => m.PromotionsModule)
  // },
  // {
  //   path: "staff",
  //   loadChildren: () => import('./staff/staff.module').then(m => m.StaffModule)
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
