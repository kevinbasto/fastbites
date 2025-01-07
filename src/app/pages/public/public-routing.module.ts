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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
