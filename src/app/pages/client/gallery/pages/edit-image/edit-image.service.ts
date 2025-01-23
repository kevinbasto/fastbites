import { Injectable, OnInit } from '@angular/core';
import { Image } from '../../../../../core/entities/image';
import { ImagesRepoService } from '../../../../../core/repos/images-repo/images-repo.service';
import { ImagesService } from '../../../../../core/services/images/images.service';
import { AuthService } from '../../../../../core/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class EditImageService {

  constructor(
    private auth: AuthService,
    private imagesRepo: ImagesRepoService,
    private imagesService: ImagesService
  ) { }

  async getImages(id: string) {
    const images = await this.imagesRepo.getImages();
    const image : Image = (images.find(img => img.id == id))!;
    return image;
  }

  async uploadImage(image: Partial<Image>, file?: File) {
    try {
      if(file){
        const uid = await this.auth.getUID();
        file = await this.imagesService.softCompressImage(file);
        let url = await this.imagesService.uploadImage(`/${uid}/gallery`, file);
        image.url = url;
      }
      await this.imagesRepo.updateImage(image as Image);
    } catch (error) {
      throw error;
    }
  }
}
