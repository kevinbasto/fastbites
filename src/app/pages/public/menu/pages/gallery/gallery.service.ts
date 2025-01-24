import { Injectable } from '@angular/core';
import * as cookie from 'cookie';
import { ImagesRepoService } from '../../../../../core/repos/images-repo/images-repo.service';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  constructor(
    private imagesrepo : ImagesRepoService
  ) { }

  async fetchImages() {
    try {
      let menuId = cookie.parse(document.cookie)['menuId']!;
      return this.imagesrepo.fetchImagesWithoutId(menuId);
    } catch (error) {
      throw error;
    }
  }
}
