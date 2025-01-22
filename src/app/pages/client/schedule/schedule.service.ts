import { Injectable } from '@angular/core';
import { MenuRepoService } from '../../../core/repos/menu-repo/menu-repo.service';
import { Observable, Observer } from 'rxjs';
import { Schedule } from '../../../core/entities/menu';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateScheduleComponent } from './dialogs/create-schedule/create-schedule.component';
import { EditScheduleComponent } from './dialogs/edit-schedule/edit-schedule.component';
import { Message } from '../../../core/generics/message';
import { ConfirmDialogComponent } from '../../../shared-components/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(
    private menuRepo: MenuRepoService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
  ) { }

  fetchSchedule() {
    return new Observable<Array<Schedule>>((obs : Observer<Array<Schedule>>) => { });
  }

  createSchedule() {
    const dialog = this.dialog.open(CreateScheduleComponent);
  }

  editSchedule(schedule: Schedule) {
    const dialog = this.dialog.open(EditScheduleComponent, { data: schedule });
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
