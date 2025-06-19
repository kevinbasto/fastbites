import { Component, OnInit } from '@angular/core';
import { Schedule } from '../../../../../core/entities/schedule';
import { ActivatedRoute, Router } from '@angular/router';
import { EditScheduleService } from './edit-schedule.service';
import { SnackbarService } from '../../../../../core/services/snackbar/snackbar.service';

@Component({
  selector: 'app-edit-schedule',
  templateUrl: './edit-schedule.component.html',
  styleUrl: './edit-schedule.component.scss'
,
  standalone: false})
export class EditScheduleComponent implements OnInit {

  uploading: boolean = false;
  id?: string;
  schedule?: Schedule;

  constructor(
    private route: ActivatedRoute,
    private editScheduleService: EditScheduleService,
    private router: Router,
    private snackbar: SnackbarService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => { 
      this.id = params.get('id')! 
      this.editScheduleService.fetchSchedule(this.id)
      .then((schedule: Schedule | undefined) => {
        if(!schedule) {
          this.snackbar.openMessage('Horario no encontrado');
          this.router.navigate(['client/schedule']);
        };
        this.schedule = schedule;
      }).catch((err) => {
        this.snackbar.openMessage('Error al obtener el horario');
      });
    });
  }

  cancel() {
    this.router.navigate(['client/schedule']);
  }

  submitProduct(schedule: Schedule) {
    this.uploading = true;
    this.editScheduleService.updateSchedule(schedule)
    .then((result) => {
      this.snackbar.openMessage('Horario actualizado');
      this.router.navigate(['client/schedule']);
    }).catch((err) => {
      this.snackbar.openMessage('Error al actualizar el horario');
    })
    .finally(() => {
      this.uploading = false;
    });
  }
}
