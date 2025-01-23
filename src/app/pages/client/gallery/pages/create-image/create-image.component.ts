import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CreateImageService } from './create-image.service';
import { Image } from '../../../../../core/entities/image';
import { SnackbarService } from '../../../../../core/services/snackbar/snackbar.service';

@Component({
  selector: 'app-create-image',
  templateUrl: './create-image.component.html',
  styleUrl: './create-image.component.scss'
})
export class CreateImageComponent {

  uploading: boolean = false;

  image?: File;
  displayImage? : string;

  constructor(
    private router: Router,
    private createImageService: CreateImageService,
    private snackbar: SnackbarService,
  ) {}

  uploadFile(file: File) {
    this.image = file;
    const reader = new FileReader();
    reader.onload = () => {
      this.displayImage = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  cancel() {
    this.router.navigate(['/client/gallery']);
  }

  postNewImage(image: Partial<Image>) {
    this.uploading = true;
    this.createImageService
    .uploadImage(image, this.image!)
    .then(() => {
      this.snackbar.openMessage('Imagen creada con éxito');
      this.router.navigate(['/client/gallery']);
    }).catch((err) => {
      this.snackbar.openMessage('No se pudo guardar la imagen');
    })
    .finally(() => this.uploading = false);
  }
}
