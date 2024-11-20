import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientMenuComponent } from './client-menu.component';

const routes: Routes = [
  {
    path: "",
    component: ClientMenuComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientMenuRoutingModule { }
