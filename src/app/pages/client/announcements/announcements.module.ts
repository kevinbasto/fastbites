import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnnouncementsRoutingModule } from './announcements-routing.module';
import { AnnouncementsComponent } from './announcements.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedComponentsModule } from '../../../shared-components/shared-components.module';
import { SharedFormsModule } from '../../../shared-forms/shared-forms.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CreateAnnouncementComponent } from './pages/create-announcement/create-announcement.component';
import { EditAnnouncementComponent } from './pages/edit-announcement/edit-announcement.component';


@NgModule({
  declarations: [
    AnnouncementsComponent,
    CreateAnnouncementComponent,
    EditAnnouncementComponent
  ],
  imports: [
    CommonModule,
    AnnouncementsRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    SharedComponentsModule,
    SharedFormsModule,
  ]
})
export class AnnouncementsModule { }
