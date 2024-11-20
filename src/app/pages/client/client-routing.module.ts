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
    path: "ordering-menu",
    loadChildren: () => import('./client-menu/client-menu.module').then(m => m.ClientMenuModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
