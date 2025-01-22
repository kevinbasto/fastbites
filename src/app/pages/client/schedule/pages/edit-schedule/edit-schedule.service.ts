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
    if (schedule.available) {
      const schedules = await this.schedulesrepo.getSchedules();
      if (schedules) {
        const filteredSchedules = schedules.filter(s => s.id !== schedule.id);
        const isOverlapping = this.hasOverlaps([...filteredSchedules, schedule]);
        if (isOverlapping) {
          schedule.available = false;
        }
      }
    }
    return this.schedulesrepo.updateSchedule(schedule);
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
