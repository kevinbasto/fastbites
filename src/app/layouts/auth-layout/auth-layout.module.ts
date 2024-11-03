import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthLayoutRoutingModule } from './auth-layout-routing.module';
import { AuthLayoutComponent } from './auth-layout.component';

import { MatCardModule } from "@angular/material/card";


@NgModule({
  declarations: [
    AuthLayoutComponent
  ],
  imports: [
    CommonModule,
    AuthLayoutRoutingModule,
    MatCardModule
  ]
})
export class AuthLayoutModule { }
