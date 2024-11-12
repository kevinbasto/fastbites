import { Injectable } from '@angular/core';
import { Firestore, doc, getDoc, setDoc, updateDoc } from '@angular/fire/firestore';
import { AuthService } from '../../../../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { Product } from '../../../../../core/entities/product';
import { SnackbarService } from '../../../../../core/services/snackbar/snackbar.service';
import { v6 as uuid } from "uuid";
import { CroppedImage } from '../../../../../core/generics/cropped-image';
import { getDownloadURL, ref, Storage, uploadBytes } from '@angular/fire/storage';
import { NgxImageCompressService } from 'ngx-image-compress';


@Injectable({
  providedIn: 'root'
})
export class CreateProductService {

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

  /**
   * algoritmo de creacion:
   * 1. se crea el uuid del producto
   * 2. al subir la imagen del producto:
   * 2.1 se guardará el raw del producto con uuid-raw
   * 2.2 se guardará el cropped del producto con uuid-cropped
   * 2.3 se retornan los download links de ambos
   * 2.4 se almacenan las coordenadas de cropping de la imagen original
   * 3. se actualiza el producto para incluir los raw y cropped
   * formato de nombre: <uuid>-<raw | cropped>.<formato>
   */
  async createProduct(product: Product, image: File, cropped: CroppedImage) {
    try {
      let uid = await this.auth.getUID();
      product.uuid = uuid();
      product.croppedPosition = cropped.position;
      let newRaw = await this.prepareImage(`${product.uuid}-raw`, image);
      let newCropped = await this.prepareImage(`${product.uuid}-cropped`, cropped.image);
      console.log(newCropped.size);
      newCropped = await this.compressImage(newCropped);
      console.log(newCropped.size);
      let rawUrl = await this.storeImage(uid!, product.uuid, newRaw);
      let croppedUrl = await this.storeImage(uid!, product.uuid, newCropped);
      product.rawImage = rawUrl;
      product.croppedImage = croppedUrl;
      let products : Array<Product> = await this.getProducts(uid!);
      products.push(product);
      await this.updateProducts(uid!, products);
      this.snackbar.openMessage("Productos actualizados con éxito");
      return;
    } catch (error) {
      console.log(error);
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

  private async updateProducts(uid: string, products: Array<Product>) {
    try {
      let docRef = doc(this.firestore, `/users/${uid}/data/products`);
      await setDoc(docRef, {products});
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

  private base64ToArrayBuffer(base64: string): ArrayBuffer {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  }

}
