import { Injectable } from '@angular/core';
import { Schedule } from '../../../../../core/entities/schedule';
import { schedulesRepoService } from '../../../../../core/repos/schedule-repo/schedule-repo.service';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditScheduleService {

  constructor(
    private schedulesrepo: schedulesRepoService
  ) { }

  fetchSchedule(id: string) {
    return new Promise<Schedule | undefined>((resolve, reject) => {
      this.schedulesrepo.fetchSchedules()
      .subscribe((schedules: Array<Schedule>) => {
        resolve(schedules.find(schedule => schedule.id === id));
      })
    });
  };

  async updateSchedule(schedule: Schedule) {
    return this.schedulesrepo.updateSchedule(schedule);
  }
}
