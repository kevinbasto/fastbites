import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderingMenuRoutingModule } from './ordering-menu-routing.module';
import { OrderingMenuComponent } from './ordering-menu.component';


@NgModule({
  declarations: [
    OrderingMenuComponent
  ],
  imports: [
    CommonModule,
    OrderingMenuRoutingModule
  ]
})
export class OrderingMenuModule { }
