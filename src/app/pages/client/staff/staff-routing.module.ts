import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaffComponent } from './staff.component';
import { CreateEmployeeComponent } from './routes/create-employee/create-employee.component';
import { EditEmployeeComponent } from './routes/edit-employee/edit-employee.component';
import { CreateGroupComponent } from './routes/create-group/create-group.component';
import { EditGroupComponent } from './routes/edit-group/edit-group.component';

const routes: Routes = [
  {
    path: "",
    component: StaffComponent
  },
  {
    path: 'employee/create',
    component: CreateEmployeeComponent,
  },
  {
    path: 'employee/:id',
    component: EditEmployeeComponent,
  },
  {
    path: 'group/create',
    component: CreateGroupComponent,
  },
  {
    path: 'group/:id',
    component: EditGroupComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRoutingModule { }
