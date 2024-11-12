import { Injectable } from '@angular/core';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { AuthService } from '../../../../../core/services/auth/auth.service';
import { Storage, getBytes, getDownloadURL, ref, uploadBytes } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { SnackbarService } from '../../../../../core/services/snackbar/snackbar.service';
import { NgxImageCompressService } from 'ngx-image-compress';

@Injectable({
  providedIn: 'root'
})
export class EditProductService {

  constructor(
    private firestore: Firestore,
    private auth: AuthService,
    private storage: Storage,
    private router : Router,
    private snackbar: SnackbarService,
    private imageCompressServ: NgxImageCompressService
  ) { }

  goBack(){
    this.router.navigate([`/client/products`]);
  }

  async updateProduct(){
    try {
      
    } catch (error) {
      throw error;
    }
  }

  private async prepareImage(name: string, file: File) {
    try {
      let format = file.name.split(".")[file.name.split(".").length - 1];
      let buffer = await file.arrayBuffer();
      return new File([buffer], `${name}.${format}`, {type: file.type});
    } catch (error) {
      throw error;
    }
  }

  private async storeImage(uid: string, prodUuid: string, file: File) : Promise<string> {
    try {
      
      let url : string = "";
      let fileRef = ref(this.storage, `/${uid}/${prodUuid}/${file.name}`);
      await uploadBytes(fileRef, file);
      url = await getDownloadURL(fileRef);
      return url;
    } catch (error) {
      throw error;
    }
  }

  private async getProducts(uid: string){
    try {
      let docRef = doc(this.firestore, `/users/${uid}/data/products`);
      let products : any = (await getDoc(docRef)).data();
      return products.products;
    } catch (error) {
      throw error;
    }
  }


  private async compressImage(file: File) {
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
            if (reader.result) {
                resolve(reader.result.toString());
            } else {
                reject(new Error('Failed to convert file to Base64'));
            }
        };
        
        reader.onerror = () => {
            reject(new Error('Error reading file'));
        };
        
        reader.readAsDataURL(file);
    });
  }
}
