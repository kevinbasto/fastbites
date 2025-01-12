import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QrTablesRoutingModule } from './qr-tables-routing.module';
import { QrTablesComponent } from './qr-tables.component';


@NgModule({
  declarations: [
    QrTablesComponent
  ],
  imports: [
    CommonModule,
    QrTablesRoutingModule
  ]
})
export class QrTablesModule { }
