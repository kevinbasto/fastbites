import { Injectable } from '@angular/core';
import { Image } from '../../../../../core/entities/image';
import { ImagesRepoService } from '../../../../../core/repos/images-repo/images-repo.service';
import { ImagesService } from '../../../../../core/services/images/images.service';
import { AuthService } from '../../../../../core/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CreateImageService {

  constructor(
    private auth: AuthService,
    private imageRepo: ImagesRepoService,
    private imagesService: ImagesService
  ) { }

  async uploadImage(image: Partial<Image>, file: File) {
    try {
      const uid = await this.auth.getUID();
      file = await this.imagesService.softCompressImage(file);
      let url = await this.imagesService.uploadImage(`/${uid}/gallery`, file);
      image.url = url;
      await this.imageRepo.createImage(image as Image);
    } catch (error) {
      throw error;
    }
  }
}
