import { Component, OnInit } from '@angular/core';
import { GalleryService } from './gallery.service';
import { Image } from '../../../../../core/entities/image';
import { SnackbarService } from '../../../../../core/services/snackbar/snackbar.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
,
  standalone: false})
export class GalleryComponent implements OnInit {

  images?: Array<Image>;

  constructor(
    private galleryService: GalleryService,
    private snackbar: SnackbarService
  ) {

  }

  ngOnInit(): void {
    this.galleryService.fetchImages()
    .then((images: Array<Image>) => {
      this.images = images;
    }).catch((err) => {
      this.snackbar.openMessage('Hubo un problema al recuperar las imagenes');
    });
  }
}
