import { Component } from '@angular/core';
import { CreateScheduleService } from './create-schedule.service';
import { Schedule } from '../../../../../core/entities/schedule';
import { SnackbarService } from '../../../../../core/services/snackbar/snackbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-schedule',
  templateUrl: './create-schedule.component.html',
  styleUrl: './create-schedule.component.scss'
})
export class CreateScheduleComponent {

  uploading = false;

  constructor(
    private createScheduleService: CreateScheduleService,
    private snackbar: SnackbarService,
    private router: Router
  ) { }

  cancel() {
    this.createScheduleService.cancel();
  }

  submitSchedule(schedule: Partial<Schedule>) {
    this.uploading = true;
    this.createScheduleService.createSchedule(schedule)
    .then((result) => {
      this.snackbar.openMessage('Schedule created successfully');
      this.router.navigate(['/client/schedule']);
    }).catch((err) => {
      this.snackbar.openMessage('Error creating schedule');
    })
    .finally(() => { this.uploading = false; });
  }

}
