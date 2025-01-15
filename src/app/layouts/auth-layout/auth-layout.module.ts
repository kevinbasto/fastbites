import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthLayoutRoutingModule } from './auth-layout-routing.module';
import { AuthLayoutComponent } from './auth-layout.component';

import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from '@angular/material/divider';


@NgModule({
  declarations: [
    AuthLayoutComponent
  ],
  imports: [
    CommonModule,
    AuthLayoutRoutingModule,
    MatCardModule,
    MatDividerModule,
  ]
})
export class AuthLayoutModule { }
