import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';

import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from "@angular/material/menu";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatStepperModule } from "@angular/material/stepper";
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import {provideCharts, withDefaultRegisterables, BaseChartDirective  } from "ng2-charts";

import { ImageCropperComponent } from 'ngx-image-cropper';
import { AppImageCropperComponent } from './image-cropper/image-cropper.component';
import { ImageDropperComponent } from './image-dropper/image-dropper.component';
import { DirectivesModule } from '../core/directives/directives.module';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

import { QrScannerComponent } from './qr-scanner/qr-scanner.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrdersTableComponent } from './orders-table/orders-table.component';
import { OrderVisualizerComponent } from './order-visualizer/order-visualizer.component';
import { MenuUrlDisplayerComponent } from './menu-url-displayer/menu-url-displayer.component';
import { OrderingMenuComponent } from './ordering-menu/ordering-menu.component';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { InfoCardComponent } from './info-card/info-card.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { ProductVisualizerComponent } from './product-visualizer/product-visualizer.component';
import { CategoryVisualizerComponent } from './category-visualizer/category-visualizer.component';
import { ResponsiveCardInfoComponent } from './responsive-card-info/responsive-card-info.component';


@NgModule({
  declarations: [
    TableComponent,
    AppImageCropperComponent,
    ImageDropperComponent,
    ConfirmDialogComponent,
    QrScannerComponent,
    CheckoutComponent,
    OrdersTableComponent,
    OrderVisualizerComponent,
    MenuUrlDisplayerComponent,
    OrderingMenuComponent,
    MenuItemComponent,
    InfoCardComponent,
    BarChartComponent,
    PieChartComponent,
    ProductVisualizerComponent,
    CategoryVisualizerComponent,
    ResponsiveCardInfoComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    MatStepperModule,
    MatInputModule,
    ImageCropperComponent,
    DirectivesModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    BaseChartDirective,
  ],
  exports: [
    TableComponent,
    AppImageCropperComponent,
    ImageDropperComponent,
    ConfirmDialogComponent,
    QrScannerComponent,
    CheckoutComponent,
    OrdersTableComponent,
    OrderVisualizerComponent,
    OrderingMenuComponent,
    InfoCardComponent,
    BarChartComponent,
    PieChartComponent,
    ProductVisualizerComponent,
    CategoryVisualizerComponent,
    ResponsiveCardInfoComponent
  ],
  providers: [
    provideCharts(withDefaultRegisterables()),
  ]
})
export class SharedComponentsModule { }
