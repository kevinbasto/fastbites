import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffRoutingModule } from './staff-routing.module';
import { StaffComponent } from './staff.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { CreateEmployeeComponent } from './routes/create-employee/create-employee.component';


@NgModule({
  declarations: [
    StaffComponent,
    EmployeesComponent,
    CreateEmployeeComponent
  ],
  imports: [
    CommonModule,
    StaffRoutingModule
  ]
})
export class StaffModule { }
