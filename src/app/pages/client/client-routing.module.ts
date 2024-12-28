import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { firstTimeGuard } from '../../core/guards/first-time/first-time.guard';

const routes: Routes = [
  {
    path: "",
    redirectTo: "menu",
    pathMatch: "full"
  },
  {
    path: "menu",
    loadChildren: () => import('./menu/menu.module').then(m => m.MenuModule),
    canActivateChild: [firstTimeGuard],
  },
  {
    path: "orders",
    loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule),
    canActivateChild: [firstTimeGuard],
  },
  {
    path: "sales",
    loadChildren: () => import('./sales/sales.module').then(m => m.SalesModule),
    canActivateChild: [firstTimeGuard],
  },
  // {
  //   path: "settings",
  //   loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule)
  // },
  {
    path: "orderslip",
    loadChildren: () => import('./order-slip/order-slip.module').then(m => m.OrderSlipModule),
    canActivateChild: [firstTimeGuard],
  },
  {
    path: "first-time",
    loadChildren: () => import('./first-time/first-time.module').then(m => m.FirstTimeModule),
    canActivate: [firstTimeGuard]
  }
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
