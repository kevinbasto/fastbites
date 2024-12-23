import { Component, OnInit } from '@angular/core';
import { StaffService } from './staff.service';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrl: './staff.component.scss'
})
export class StaffComponent implements OnInit {

  constructor(
    private staffServ: StaffService
  ) {}

  ngOnInit(): void {
    
  }
}
