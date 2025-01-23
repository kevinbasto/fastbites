import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { CheckoutComponent } from '../../../shared-components/checkout/checkout.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { ProductDetailComponent } from './dialogs/product-detail/product-detail.component';

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
        path: 'checkout',
        component: CheckoutComponent
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
