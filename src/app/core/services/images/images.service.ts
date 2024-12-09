import { Injectable } from '@angular/core';
import { deleteObject, getDownloadURL, list, ref, Storage, uploadBytes } from '@angular/fire/storage';
import { AuthService } from '../auth/auth.service';
import { NgxImageCompressService } from 'ngx-image-compress';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  constructor(
    private storage: Storage,
    private imageCompressServ: NgxImageCompressService
  ) { }

  async prepareImage(name: string, file: File) {
    try {
      let format = file.name.split(".")[file.name.split(".").length - 1];
      let buffer = await file.arrayBuffer();
      return new File([buffer], `${name}.${format}`, {type: file.type});
    } catch (error) {
      throw error;
    }
  }

  async uploadImage(route: string, file: File) : Promise<string> {
    try {
      let fileRef = await ref(this.storage, `/${route}/${file.name}`);
      await uploadBytes(fileRef, file);
      return await getDownloadURL(fileRef);
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
      let compressed = await this.imageCompressServ.compressFile(base64, 1, 150, 150, 100, 100);
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
