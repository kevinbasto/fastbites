import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderingMenuRoutingModule } from './ordering-menu-routing.module';
import { OrderingMenuComponent } from './ordering-menu.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedComponentsModule } from '../../../shared-components/shared-components.module';


@NgModule({
  declarations: [
    OrderingMenuComponent
  ],
  imports: [
    CommonModule,
    OrderingMenuRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatDialogModule,
    SharedComponentsModule
  ]
})
export class OrderingMenuModule { }
