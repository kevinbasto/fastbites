import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EditImageService } from './edit-image.service';
import { SnackbarService } from '../../../../../core/services/snackbar/snackbar.service';
import { Image } from '../../../../../core/entities/image';

@Component({
  selector: 'app-edit-image',
  templateUrl: './edit-image.component.html',
  styleUrl: './edit-image.component.scss'
,
  standalone: false})
export class EditImageComponent implements OnInit {

  id?: string;
  image?: Image;

  uploading: boolean = false;

  imageFile?: File;
  displayImage? : string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private editImageService: EditImageService,
    private snackbar: SnackbarService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id')!;
      this.editImageService.getImages(this.id)
      .then((image: Image) => {
        this.image = image;
        this.displayImage = image.url;
      }).catch((err) => {
        this.snackbar.openMessage('No se pudo obtener la imagen');
        this.router.navigate(['/client/gallery']);
      });
    })
  }

  uploadFile(file: File) {
    this.imageFile = file;
    const reader = new FileReader();
    reader.onload = () => {
      this.displayImage = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  cancel() {
    this.router.navigate(['/client/gallery']);
  }

  editImage(image: Partial<Image>) {
    this.uploading = true;
    this.editImageService
    .uploadImage(image, this.imageFile!)
    .then(() => {
      this.snackbar.openMessage('Imagen creada con éxito');
      this.router.navigate(['/client/gallery']);
    }).catch((err) => {
      this.snackbar.openMessage('No se pudo guardar la imagen');
    })
    .finally(() => this.uploading = false);
  }
}
