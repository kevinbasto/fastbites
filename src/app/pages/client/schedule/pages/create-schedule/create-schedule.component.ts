import { Component } from '@angular/core';
import { CreateScheduleService } from './create-schedule.service';
import { Schedule } from '../../../../../core/entities/schedule';

@Component({
  selector: 'app-create-schedule',
  templateUrl: './create-schedule.component.html',
  styleUrl: './create-schedule.component.scss'
})
export class CreateScheduleComponent {

  uploading = false;

  constructor(
    private createScheduleService: CreateScheduleService
  ) { }

  cancel() {
    this.createScheduleService.cancel();
  }

  submitSchedule(schedule: Partial<Schedule>) {
    this.createScheduleService.createSchedule(schedule);
  }

}
