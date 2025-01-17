import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { firstTimeGuard } from '../../core/guards/first-time/first-time.guard';

const routes: Routes = [
  {
    path: "",
    redirectTo: "menu",
    pathMatch: "full"
  },
  // la idea principal de este enrutado es similar a navigation menu, que es: menu, personalizacion, comanda, ordenes, ventas, configuraciones,
  {
    path: "menu",
    loadChildren: () => import('./menu/menu.module').then(m => m.MenuModule),
    canActivateChild: [firstTimeGuard],
  },
  {
    path: "personalization",
    loadChildren: () => import('./personalization/personalization.module').then(m => m.PersonalizationModule),
    canActivateChild: [firstTimeGuard],
  },
  {
    path: "orderslip",
    loadChildren: () => import('./order-slip/order-slip.module').then(m => m.OrderSlipModule),
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
  {
    path: 'qrtables',
    loadChildren: () => import('./qr-tables/qr-tables.module').then(m => m.QrTablesModule),
    canActivateChild: [firstTimeGuard],
  },
  {
    path: "settings",
    loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule),
    canActivateChild: [firstTimeGuard],
  },
  {
    path: 'schedule',
    loadChildren: () => import('./schedule/schedule.module').then(m => m.ScheduleModule),
    canActivateChild: [firstTimeGuard],
  },
  {
    path: 'gallery',
    loadChildren: () => import('./gallery/gallery.module').then(m => m.GalleryModule),
    canActivateChild: [firstTimeGuard],
  },
  {
    path: 'announcements',
    loadChildren: () => import('./announcements/announcements.module').then(m => m.AnnouncementsModule),
    canActivateChild: [firstTimeGuard],
  },
  // elementos de uso unico que no se pretende sean accesibles una vez cumplida su funcion
  {
    path: "first-time",
    loadChildren: () => import('./first-time/first-time.module').then(m => m.FirstTimeModule),
    canActivateChild: [firstTimeGuard],
  },
  // {
  //   path: "promos",
  //   loadChildren: () => import('./promotions/promotions.module').then(m => m.PromotionsModule)
  // },
  {
    path: "staff",
    loadChildren: () => import('./staff/staff.module').then(m => m.StaffModule)
  },
  {
    path: 'shifts',
    loadChildren: () => import('./shifts/shifts.module').then(m => m.ShiftsModule)
  },
  {
    path: '**',
    redirectTo: 'menu'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
