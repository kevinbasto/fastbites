import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { ProductDetailComponent } from './dialogs/product-detail/product-detail.component';
import { OrderCheckoutComponent } from './pages/order-checkout/order-checkout.component';
import { QrScannerComponent } from './pages/qr-scanner/qr-scanner.component';

const routes: Routes = [
  {
    path: "",
    component: MenuComponent,
    children: [
      {
        path: '',
        component: CatalogComponent
      },
      {
        path: 'scan',
        component: QrScannerComponent
      },
      {
        path: 'checkout',
        component: OrderCheckoutComponent
      },
      {
        path: 'gallery',
        component: GalleryComponent
      },
      {
        path: 'product/:id',
        component: ProductDetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
