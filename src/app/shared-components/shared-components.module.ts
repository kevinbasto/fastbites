import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';

import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from "@angular/material/menu";
import { MatPaginatorModule } from "@angular/material/paginator";
import { NgxImageCompressService } from 'ngx-image-compress';
import { ImageCropperComponent } from 'ngx-image-cropper';
import { AppImageCropperComponent } from './image-cropper/image-cropper.component';
import { ImageDropperComponent } from './image-dropper/image-dropper.component';
import { DirectivesModule } from '../core/directives/directives.module';



@NgModule({
  declarations: [
    TableComponent,
    AppImageCropperComponent,
    ImageDropperComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatPaginatorModule,
    ImageCropperComponent,
    DirectivesModule
  ],
  exports: [
    TableComponent,
    AppImageCropperComponent,
    ImageDropperComponent
  ],
  providers: [
    NgxImageCompressService
  ]
})
export class SharedComponentsModule { }
