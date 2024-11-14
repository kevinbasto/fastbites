import { Injectable } from '@angular/core';
import { ref } from '@angular/fire/storage';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ImageServiceService {

  constructor(
    private authService: AuthService
  ) { }

  async uploadImage(route: string, file: File) {
    try {
      
    } catch (error) {
      throw error;
    }
  }

  async removeImages(path: string) {
    try {
      let uid = await this.authService.getUID();
      // let folderRef = ref()
    } catch (error) {
      throw error;
    }
  }

}
