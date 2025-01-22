import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScheduleComponent } from './schedule.component';
import { create } from 'qrcode';
import { CreateScheduleComponent } from './pages/create-schedule/create-schedule.component';
import { EditScheduleComponent } from './pages/edit-schedule/edit-schedule.component';

const routes: Routes = [
  {
    path: '',
    component: ScheduleComponent
  },
  {
    path: 'create',
    component: CreateScheduleComponent
  },
  {
    path: 'edit/:id',
    component: EditScheduleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScheduleRoutingModule { }
