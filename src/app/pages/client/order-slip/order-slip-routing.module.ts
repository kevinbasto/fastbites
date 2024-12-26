import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderSlipComponent } from './order-slip.component';

const routes: Routes = [
  {
    path: "",
    component: OrderSlipComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderSlipRoutingModule { }
