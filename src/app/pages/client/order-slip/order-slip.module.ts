import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderSlipRoutingModule } from './order-slip-routing.module';
import { OrderSlipComponent } from './order-slip.component';
import { SharedComponentsModule } from '../../../shared-components/shared-components.module';
import { SharedFormsModule } from '../../../shared-forms/shared-forms.module';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from "@angular/material/expansion";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [
    OrderSlipComponent
  ],
  imports: [
    CommonModule,
    OrderSlipRoutingModule,
    SharedComponentsModule,
    SharedFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatDividerModule
  ]
})
export class OrderSlipModule { }
