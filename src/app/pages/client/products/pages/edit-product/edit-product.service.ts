import { Injectable } from '@angular/core';
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { AuthService } from '../../../../../core/services/auth/auth.service';
import { Storage, getBytes, getDownloadURL, ref, uploadBytes } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { SnackbarService } from '../../../../../core/services/snackbar/snackbar.service';
import { NgxImageCompressService } from 'ngx-image-compress';
import { Product } from '../../../../../core/entities/product';
import { CroppedImage } from '../../../../../core/generics/cropped-image';

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

  /**
   * la idea basica con la edicion del producto es:
   * se revisa si existe un nuevo Archivo, si lo hay se sube y se sube el nuevo cropped
   * si solo el cropped se ve modificado, entonces se cargaran solo el cropped y se actualizara el
   * cropped en el producto final. Una vez realizada la actualización de imágenes, se actualizaran las
   * urls en producto y de ahi se procedera a actualizar el array de productos en el producto que tiene el mismo uuid
   * y de ahi procedera a guardar los cambios.
   * @param product - el producto a actualizar
   * @param image - el archivo
   * @param cropped - el nuevo recorte
   */
  async updateProduct(product: Product, image?: File, cropped?: CroppedImage){
    try {
      let uid = await this.auth.getUID();
      let { uuid } = product;
      if(image){
        let newRaw = await this.prepareImage(`${uuid}-raw`, image);
        let fileUrl = await this.storeImage(uid!, uuid, newRaw);
        product.rawImage = fileUrl;
      }
      if(cropped){
        let newCropped = await this.prepareImage(`${uuid}-cropped`, cropped!.image);
        newCropped = await this.compressImage(newCropped);
        let croppedUrl = await this.storeImage(uid!, uuid, newCropped);
        product.croppedImage = croppedUrl;
        product.croppedPosition = cropped!.position;
      }
      let products : Array<Product> = await this.getProducts(uid!);
      products = products.map(prod => {
        if(product.uuid == uuid)
          return {...prod, ...product};
        else
          return prod;
      }) as any;
      await this.updateProducts(uid!, products);
      this.snackbar.openMessage("Productos actualizados");
      this.router.navigate([`/client/products`]);
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
}
