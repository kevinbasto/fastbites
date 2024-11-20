import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { MenuComponent } from './menu.component';
import { SharedComponentsModule } from '../../../shared-components/shared-components.module';
import { SharedFormsModule } from '../../../shared-forms/shared-forms.module';


@NgModule({
  declarations: [
    MenuComponent
  ],
  imports: [
    CommonModule,
    MenuRoutingModule,
    SharedComponentsModule,
    SharedFormsModule
  ]
})
export class MenuModule { }
