import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QrTablesComponent } from './qr-tables.component';

const routes: Routes = [
  {
    path: '',
    component: QrTablesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QrTablesRoutingModule { }
