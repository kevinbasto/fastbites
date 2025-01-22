import { Component } from '@angular/core';
import { schedulesTableConfig, schedulesTableHeaders } from './schedules-table.headers';
import { Schedule } from '../../../core/entities/schedule'; 
import { environment } from '../../../../environments/environment';
import { PageEvent } from '@angular/material/paginator';
import { ScheduleService } from './schedule.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.scss'
})
export class ScheduleComponent {

  headers = schedulesTableHeaders;
  config = schedulesTableConfig;
  options = environment.paginationOptions;
  size = environment.defaultPageSize;
  displaySchedules: Array<Schedule> = [];
  schedules: Array<Schedule> = [];

  constructor(
    private router: Router,
    private scheduleService: ScheduleService
  ) { }

  ngOnInit(): void {
    this.scheduleService.fetchSchedule().subscribe(schedules => { 
      this.schedules = schedules;
      this.displaySchedules = schedules.slice(0, this.size);
    });
  }

  addSchedule() {
    this.router.navigate(['client/schedule/create']);
  }

  updateSchedule(schedule: Schedule) {
    this.router.navigate(['client/schedule/edit', schedule.id]);
  }

  changePage(page: PageEvent) {
    const startIndex = page.pageIndex * page.pageSize;
    const endIndex = startIndex + page.pageSize;
    this.displaySchedules = this.schedules?.slice(startIndex, endIndex) || [];
  }
}
