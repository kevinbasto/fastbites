import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesRoutingModule } from './sales-routing.module';
import { SharedComponentsModule } from '../../../shared-components/shared-components.module';
import { MatCardModule } from '@angular/material/card';
import { SalesComponent } from './sales.component';


@NgModule({
  declarations: [
    SalesComponent
  ],
  imports: [
    CommonModule,
    SalesRoutingModule,
    SharedComponentsModule,
    MatCardModule
  ]
})
export class SalesModule { }
