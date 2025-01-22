import { Injectable } from '@angular/core';
import { Schedule } from '../../../../../core/entities/schedule';
import { Router } from '@angular/router';
import { schedulesRepoService } from '../../../../../core/repos/schedule-repo/schedule-repo.service';

@Injectable({
  providedIn: 'root'
})
export class CreateScheduleService {

  constructor(
    private router: Router,
    private scheduleRepo: schedulesRepoService
  ) { }

  cancel() {
    this.router.navigate(['/client/schedule']);
  }

  createSchedule(schedule: Partial<Schedule>) {
    // this.scheduleRepo.createSchedule(schedule)
  }
}
