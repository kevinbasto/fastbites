import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScheduleRoutingModule } from './schedule-routing.module';
import { ScheduleComponent } from './schedule.component';
import { MatCardModule } from '@angular/material/card';
import { SharedComponentsModule } from '../../../shared-components/shared-components.module';
import { SharedFormsModule } from '../../../shared-forms/shared-forms.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CreateScheduleComponent } from './pages/create-schedule/create-schedule.component';
import { EditScheduleComponent } from './pages/edit-schedule/edit-schedule.component';


@NgModule({
  declarations: [
    ScheduleComponent,
    CreateScheduleComponent,
    EditScheduleComponent,
  ],
  imports: [
    CommonModule,
    ScheduleRoutingModule,
    MatCardModule,
    SharedComponentsModule,
    SharedFormsModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
  ]
})
export class ScheduleModule { }
