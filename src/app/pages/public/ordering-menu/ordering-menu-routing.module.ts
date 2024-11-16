import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderingMenuComponent } from './ordering-menu.component';

const routes: Routes = [
  {
    path: "",
    component: OrderingMenuComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderingMenuRoutingModule { }
