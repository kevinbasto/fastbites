import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';

import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from "@angular/material/menu";
import { MatPaginatorModule } from "@angular/material/paginator";
import { ImageCropperComponent } from 'ngx-image-cropper';
import { AppImageCropperComponent } from './image-cropper/image-cropper.component';
import { ImageDropperComponent } from './image-dropper/image-dropper.component';
import { DirectivesModule } from '../core/directives/directives.module';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { QrScannerComponent } from './qr-scanner/qr-scanner.component';
import { CheckoutComponent } from './checkout/checkout.component';



@NgModule({
  declarations: [
    TableComponent,
    AppImageCropperComponent,
    ImageDropperComponent,
    ConfirmDialogComponent,
    QrScannerComponent,
    CheckoutComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    ImageCropperComponent,
    DirectivesModule
  ],
  exports: [
    TableComponent,
    AppImageCropperComponent,
    ImageDropperComponent,
    ConfirmDialogComponent,
    QrScannerComponent,
    CheckoutComponent
  ],
  providers: [
    
  ]
})
export class SharedComponentsModule { }
