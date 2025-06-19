import { Component, OnInit } from '@angular/core';
import { StaffService } from './staff.service';
import { Staff } from '../../../core/entities/staff';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrl: './staff.component.scss'
,
  standalone: false})
export class StaffComponent implements OnInit {

  staff?: Staff;

  constructor(
    private staffServ: StaffService
  ) {}

  ngOnInit(): void {
    this.staffServ.fetchStaff()
    .subscribe((staff) => this.staff = staff);  
  }
}
