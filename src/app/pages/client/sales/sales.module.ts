import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesRoutingModule } from './sales-routing.module';
import { SharedComponentsModule } from '../../../shared-components/shared-components.module';
import { MatCardModule } from '@angular/material/card';
import { SalesComponent } from './sales.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    SalesComponent
  ],
  imports: [
    CommonModule,
    SalesRoutingModule,
    SharedComponentsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class SalesModule { }
