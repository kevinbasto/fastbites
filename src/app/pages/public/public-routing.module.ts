import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    redirectTo: "landing",
    pathMatch: "full"
  },
  {
    path: "landing",
    loadChildren: () => import('./landing/landing.module').then(m => m.LandingModule)
  },
  {
    path: "menu",
    loadChildren: () => import("./menu/menu.module").then(m => m.MenuModule)
  },
  {
    path: "buy",
    loadChildren: () => import('./buy/buy.module').then(m => m.BuyModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then(m => m.AboutModule)
  },
  {
    path: 'book',
    loadChildren: () => import('./book/book.module').then(m => m.BookModule)
  },
  {
    path: '',
    loadChildren: () => import('./documentation/documentation.module').then(m => m.DocumentationModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
