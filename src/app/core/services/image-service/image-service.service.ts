import { Injectable } from '@angular/core';
import { deleteObject, list, ref, Storage } from '@angular/fire/storage';
import { AuthService } from '../auth/auth.service';
import { NgxImageCompressService } from 'ngx-image-compress';

@Injectable({
  providedIn: 'root'
})
export class ImageServiceService {

  constructor(
    private storage: Storage,
    private imageCompressServ: NgxImageCompressService
  ) { }

  async uploadImage(route: string, file: File) {
    try {
      
    } catch (error) {
      throw error;
    }
  }

  async removeFromStorage(uid: string, uuid: string) {
    try {
      let folderRef = ref(this.storage, `${uid}/${uuid}`);
      await list(folderRef)
      .then(async (result) => {
        for(let item of result.items)
          await deleteObject(item);
      }).catch((err) => {
        
      });
    } catch (error) {
      throw error;
    }
  }

  async compressImage(file: File) {
    try {
      let base64 = await this.fileToBase64(file);
      let compressed = await this.imageCompressServ.compressFile(base64, 1, 50, 50, 75, 75);
      let blob = (await ((await fetch(compressed)).blob()))
      let compressedFile = new File([blob], file.name, {type: file.type});
      return compressedFile;
    } catch (error) {
      throw error;
    }
  }

  private fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (reader.result)
            resolve(reader.result.toString());
          else
            reject(new Error('Failed to convert file to Base64'));
        };
        reader.onerror = () => { reject(new Error('Error reading file')); };
        reader.readAsDataURL(file);
    });
  }
}
