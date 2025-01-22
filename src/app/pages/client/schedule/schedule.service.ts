import { Injectable } from '@angular/core';
import { Schedule } from '../../../core/entities/schedule';
import { MatDialog } from '@angular/material/dialog';
import { Message } from '../../../core/generics/message';
import { ConfirmDialogComponent } from '../../../shared-components/confirm-dialog/confirm-dialog.component';
import { schedulesRepoService } from '../../../core/repos/schedule-repo/schedule-repo.service';
import { SnackbarService } from '../../../core/services/snackbar/snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(
    private scheduleRepo: schedulesRepoService,
    private dialog: MatDialog,
    private snackbar: SnackbarService,
  ) { }

  fetchSchedule() {
    return this.scheduleRepo.fetchSchedules();
  }

  async toggleSchedule(schedule: Schedule, schedules: Array<Schedule>) {
    return new Promise((resolve, reject) => {
      schedule.available = !schedule.available;
      schedules.map(sch => {
        if (sch.id === schedule.id) {
          sch = schedule;
        }
        return sch;
      });
      let overlap = this.hasOverlaps(schedules);
      if (overlap) {
        this.snackbar.openMessage('Error: Hay traslape de Horarios');
        reject('Overlap');
      } else {
        this.scheduleRepo.updateSchedule(schedule)
          .then(() => {
            this.snackbar.openMessage('Horario actualizado');
            resolve(null);
          }).catch((err) => {
            this.snackbar.openMessage('Error al actualizar horario');
            reject(err);
          });
      }
    });
  }

  removeSchedule(schedule: Schedule) {
    const message: Message = {
      name: '¿Borrar Horario?',
      message: 'Una vez hecho no se puede deshacer'
    }
    const dialog = this.dialog.open(ConfirmDialogComponent, { data: message });
    dialog.afterClosed().subscribe((result: boolean) => {
      if (!result) return;
      this.scheduleRepo.deleteSchedule(schedule)
        .then((result) => {
          this.snackbar.openMessage('Horario eliminado');
        }).catch((err) => {
          this.snackbar.openMessage('Error al eliminar horario');
        });
    });
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
