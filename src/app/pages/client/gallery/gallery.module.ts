import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GalleryRoutingModule } from './gallery-routing.module';
import { GalleryComponent } from './gallery.component';
import { SharedComponentsModule } from '../../../shared-components/shared-components.module';
import { SharedFormsModule } from '../../../shared-forms/shared-forms.module';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [
    GalleryComponent
  ],
  imports: [
    CommonModule,
    GalleryRoutingModule,
    SharedComponentsModule,
    SharedFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule
  ]
})
export class GalleryModule { }
