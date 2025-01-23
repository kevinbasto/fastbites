import { Injectable } from '@angular/core';
import { ImagesRepoService } from '../../../core/repos/images-repo/images-repo.service';
import { SnackbarService } from '../../../core/services/snackbar/snackbar.service';
import { Image } from '../../../core/entities/image';
import { MatDialog } from '@angular/material/dialog';

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

  togglePhoto(image: Image) { }

  deletePhoto(image: Image) { }

}
