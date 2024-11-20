import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientMenuRoutingModule } from './client-menu-routing.module';
import { ClientMenuComponent } from './client-menu.component';


@NgModule({
  declarations: [
    ClientMenuComponent
  ],
  imports: [
    CommonModule,
    ClientMenuRoutingModule
  ]
})
export class ClientMenuModule { }
