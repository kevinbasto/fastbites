import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnnouncementsComponent } from './announcements.component';
import { CreateAnnouncementComponent } from './pages/create-announcement/create-announcement.component';
import { EditAnnouncementComponent } from './pages/edit-announcement/edit-announcement.component';

const routes: Routes = [
  {
    path: '',
    component: AnnouncementsComponent
  },
  {
    path: 'create',
    component: CreateAnnouncementComponent
  },
  {
    path: 'edit/:id',
    component: EditAnnouncementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnnouncementsRoutingModule { }
