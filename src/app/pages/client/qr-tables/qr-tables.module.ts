import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QrTablesRoutingModule } from './qr-tables-routing.module';
import { QrTablesComponent } from './qr-tables.component';
import { MatCardModule } from '@angular/material/card';
import { SharedComponentsModule } from '../../../shared-components/shared-components.module';
import { SharedFormsModule } from '../../../shared-forms/shared-forms.module';


@NgModule({
  declarations: [
    QrTablesComponent
  ],
  imports: [
    CommonModule,
    QrTablesRoutingModule,
    MatCardModule,
    SharedComponentsModule,
    SharedFormsModule
  ]
})
export class QrTablesModule { }
