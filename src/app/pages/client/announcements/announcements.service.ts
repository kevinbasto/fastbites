import { Injectable } from '@angular/core';
import { AnnouncementsRepoService } from '../../../core/repos/announcements-repo/announcements-repo.service';
import { SnackbarService } from '../../../core/services/snackbar/snackbar.service';
import { Announcement } from '../../../core/entities/announcement';
import { MatDialog } from '@angular/material/dialog';
import { Message } from '../../../core/generics/message';
import { ConfirmDialogComponent } from '../../../shared-components/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementsService {

  constructor(
    private announcementsRepo: AnnouncementsRepoService,
    private snackbar: SnackbarService,
    private dialog: MatDialog
  ) { }

  fetchAnnouncements() {
    return this.announcementsRepo.fetchAnnouncements();
  }

  toggleAnnouncement(announcement: Announcement) {
    announcement.available = !announcement.available;
    this.announcementsRepo.updateAnnouncement(announcement)
    .then((result) => {
      this.snackbar.openMessage('Anuncio actualizado con éxito');
    }).catch((err) => {
      this.snackbar.openMessage('Hubo un problema al actualizar el anuncio');
    });
  }

  deleteAnnouncement(announcement: Announcement) {
    const message: Message = {
      name: '¿Borrar Anuncio?',
      message: 'Una vez hecha esta acción no se podrá deshacer'
    }
    const dialog = this.dialog.open(ConfirmDialogComponent, { data: message });
    dialog.afterClosed().subscribe((confirmation: boolean) => {
      if (!confirmation) return;
      this.announcementsRepo.deleteAnnouncement(announcement)
      .then((result) => {
        this.snackbar.openMessage("Anuncio borrado con éxito");
      }).catch((err) => {
        this.snackbar.openMessage('No se pudo borrar el anuncio');
      });
    })
  }

}