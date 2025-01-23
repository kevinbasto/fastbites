import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { MenuComponent } from './menu.component';
import { SharedComponentsModule } from '../../../shared-components/shared-components.module';
import { SharedFormsModule } from '../../../shared-forms/shared-forms.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from "@angular/material/toolbar";
import { ProductDetailComponent } from './dialogs/product-detail/product-detail.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { OrderCheckoutComponent } from './pages/order-checkout/order-checkout.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { QrScannerComponent } from './pages/qr-scanner/qr-scanner.component';

@NgModule({
  declarations: [
    MenuComponent,
    ProductDetailComponent,
    OrderCheckoutComponent,
    GalleryComponent,
    CatalogComponent,
    QrScannerComponent,
  ],
  imports: [
    CommonModule,
    MenuRoutingModule,
    MatProgressSpinnerModule,
    SharedComponentsModule,
    SharedFormsModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    MatExpansionModule,
    MatTabsModule,
    MatToolbarModule,
    MatInputModule,
    FormsModule,
    MatSidenavModule
  ]
})
export class MenuModule { }
