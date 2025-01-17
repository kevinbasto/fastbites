import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffRoutingModule } from './staff-routing.module';
import { StaffComponent } from './staff.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { CreateEmployeeComponent } from './routes/create-employee/create-employee.component';
import { EditEmployeeComponent } from './routes/edit-employee/edit-employee.component';
import { GroupsComponent } from './components/groups/groups.component';
import { CreateGroupComponent } from './routes/create-group/create-group.component';


@NgModule({
  declarations: [
    StaffComponent,
    EmployeesComponent,
    CreateEmployeeComponent,
    EditEmployeeComponent,
    GroupsComponent,
    CreateGroupComponent
  ],
  imports: [
    CommonModule,
    StaffRoutingModule
  ]
})
export class StaffModule { }
