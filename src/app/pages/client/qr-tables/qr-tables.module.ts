import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QrTablesRoutingModule } from './qr-tables-routing.module';
import { QrTablesComponent } from './qr-tables.component';
import { MatCardModule } from '@angular/material/card';
import { SharedComponentsModule } from '../../../shared-components/shared-components.module';
import { SharedFormsModule } from '../../../shared-forms/shared-forms.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CreateTableComponent } from './dialogs/create-table/create-table.component';
import { VisualizeTableComponent } from './dialogs/visualize-table/visualize-table.component';
import { UpdateTableComponent } from './dialogs/update-table/update-table.component';
import { VisualizeQrComponent } from './dialogs/visualize-qr/visualize-qr.component';


@NgModule({
  declarations: [
    QrTablesComponent,
    CreateTableComponent,
    VisualizeTableComponent,
    UpdateTableComponent,
    VisualizeQrComponent
  ],
  imports: [
    CommonModule,
    QrTablesRoutingModule,
    MatCardModule,
    SharedComponentsModule,
    SharedFormsModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class QrTablesModule { }
