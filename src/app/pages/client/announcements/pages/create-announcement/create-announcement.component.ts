import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Announcement } from '../../../../../core/entities/announcement';
import { CreateAnnouncementService } from './create-announcement.service';
import { SnackbarService } from '../../../../../core/services/snackbar/snackbar.service';

@Component({
  selector: 'app-create-announcement',
  templateUrl: './create-announcement.component.html',
  styleUrl: './create-announcement.component.scss'
,
  standalone: false})
export class CreateAnnouncementComponent {

  uploading: boolean = false;

  constructor(
    private router: Router,
    private createAnnouncementService: CreateAnnouncementService,
    private snackbar: SnackbarService
  ) {}

  cancel() {
    this.router.navigate(['/client/announcements'])
  }

  saveAnnouncement(announcement: Partial<Announcement>) {
    this.uploading = !this.uploading;
    this.createAnnouncementService.createAnnouncement(announcement)
    .then((result) => {
      this.snackbar.openMessage('Anuncio creado con éxito');
      this.cancel();
    }).catch((err) => {
      this.snackbar.openMessage('Hubo un problema al crear los anuncios');
    })
    .finally(() => {
      this.uploading = !this.uploading;
    });
  }

}
