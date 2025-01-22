import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { Schedule } from '../../../core/entities/schedule';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Message } from '../../../core/generics/message';
import { ConfirmDialogComponent } from '../../../shared-components/confirm-dialog/confirm-dialog.component';
import { schedulesRepoService } from '../../../core/repos/schedule-repo/schedule-repo.service';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(
    private scheduleRepo: schedulesRepoService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
  ) { }

  fetchSchedule() {
    return this.scheduleRepo.fetchSchedules();
  }

  toggleSchedule(schedule: Schedule) { }

  removeSchedule() {
    const message : Message = {
      name: '¿Borrar Horario?',
      message: 'Una vez hecho no se puede deshacer'
    }
    const dialog = this.dialog.open(ConfirmDialogComponent, { data: message });
  }
}
