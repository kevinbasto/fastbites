import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GalleryComponent } from './gallery.component';
import { CreateImageComponent } from './pages/create-image/create-image.component';
import { EditImageComponent } from './pages/edit-image/edit-image.component';

const routes: Routes = [
  {
    path: '',
    component: GalleryComponent
  },
  {
    path: 'create',
    component: CreateImageComponent
  },
  {
    path: 'edit/:id',
    component: EditImageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GalleryRoutingModule { }
