import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientMenuRoutingModule } from './client-menu-routing.module';
import { ClientMenuComponent } from './client-menu.component';
import { SharedComponentsModule } from '../../../shared-components/shared-components.module';
import { SharedFormsModule } from '../../../shared-forms/shared-forms.module';


@NgModule({
  declarations: [
    ClientMenuComponent
  ],
  imports: [
    CommonModule,
    ClientMenuRoutingModule,
    SharedComponentsModule,
    SharedFormsModule
  ]
})
export class ClientMenuModule { }
