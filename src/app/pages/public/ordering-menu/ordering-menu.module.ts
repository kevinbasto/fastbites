import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderingMenuRoutingModule } from './ordering-menu-routing.module';
import { OrderingMenuComponent } from './ordering-menu.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';


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
    MatIconModule
  ]
})
export class OrderingMenuModule { }
