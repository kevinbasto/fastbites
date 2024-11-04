import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';

import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";



@NgModule({
  declarations: [
    ProductsComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule
  ]
})
export class ProductsModule { }
