import { Injectable } from '@angular/core';
import { Schedule } from '../../../../../core/entities/schedule';
import { Router } from '@angular/router';
import { schedulesRepoService } from '../../../../../core/repos/schedule-repo/schedule-repo.service';
import { lastValueFrom } from 'rxjs';

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

  async createSchedule(schedule: Partial<Schedule>) {
    if (!schedule.id && schedule.available) {
      const schedules = await this.scheduleRepo.getSchedules()
      if (schedules) {
        const isOverlapping = this.hasOverlaps([...schedules, schedule as Schedule]);
  
        if (isOverlapping) {
          schedule.available = false;
        }
      }
    }
    this.scheduleRepo.createSchedule(schedule);
  }


  parseTime(time: string): Date {
    const [timePart, modifier] = time.split(' ');
    let [hours, minutes] = timePart.split(':').map(Number);
  
    if (modifier === 'PM' && hours !== 12) {
      hours += 12;
    } else if (modifier === 'AM' && hours === 12) {
      hours = 0;
    }
  
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  }
  
  hasOverlaps(schedules: Schedule[]): boolean {
    const times = schedules.map(schedule => ({
      opening: this.parseTime(schedule.openingHour),
      closing: this.parseTime(schedule.closingHour)
    }));
  
    for (let i = 0; i < times.length; i++) {
      for (let j = i + 1; j < times.length; j++) {
        if (
          (times[i].opening < times[j].closing && times[i].closing > times[j].opening) ||
          (times[j].opening < times[i].closing && times[j].closing > times[i].opening)
        ) {
          return true;
        }
      }
    }
  
    return false;
  }
}
