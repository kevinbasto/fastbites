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

  toggleSchedule(schedule: Schedule) {
    schedule.available = !schedule.available;
    this.scheduleRepo.updateSchedule(schedule)
    .then(() => {
      this.snackbar.openMessage('Horario actualizado');
    }).catch((err) => {
      this.snackbar.openMessage('Error al actualizar horario');
    });
  }

  removeSchedule(schedule: Schedule) {
    const message : Message = {
      name: '¿Borrar Horario?',
      message: 'Una vez hecho no se puede deshacer'
    }
    const dialog = this.dialog.open(ConfirmDialogComponent, { data: message });
    dialog.afterClosed().subscribe((result: boolean) => {
      if(!result) return;
      this.scheduleRepo.deleteSchedule(schedule)
      .then((result) => {
        this.snackbar.openMessage('Horario eliminado');
      }).catch((err) => {
        this.snackbar.openMessage('Error al eliminar horario');
      });
    });
  }
}
