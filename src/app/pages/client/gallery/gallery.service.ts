import { Injectable } from '@angular/core';
import { ImagesRepoService } from '../../../core/repos/images-repo/images-repo.service';
import { SnackbarService } from '../../../core/services/snackbar/snackbar.service';
import { Image } from '../../../core/entities/image';
import { MatDialog } from '@angular/material/dialog';
import { Message } from '../../../core/generics/message';
import { ConfirmDialogComponent } from '../../../shared-components/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  constructor(
    private imagesRepo: ImagesRepoService,
    private snackbar: SnackbarService,
    private dialog: MatDialog
  ) { }

  fetchImages() {
    return this.imagesRepo.fetchImages();
  }

  togglePhoto(image: Image) {
    image.available = !image.available;
    this.imagesRepo.updateImage(image)
    .then((result) => {
      this.snackbar.openMessage('Imagen actualizada con éxito');
    }).catch((err) => {
      this.snackbar.openMessage('Hubo un problema al actualizar la imagen');
    });
  }

  deletePhoto(image: Image) {
    const message: Message = {
      name: '¿Borrar Imagen?',
      message: 'Una vez hecha esta acción no se podrá deshacer'
    }
    const dialog = this.dialog.open(ConfirmDialogComponent, { data: message });
    dialog.afterClosed().subscribe((confirmation : boolean) => {
      if(!confirmation) return;
      this.imagesRepo.deleteImage(image)
      .then((result) => {
        this.snackbar.openMessage("Imagen borrada con éxito");
      }).catch((err) => {
        this.snackbar.openMessage('No se pudo borrar la imagen');
      });
    })
  }

}
