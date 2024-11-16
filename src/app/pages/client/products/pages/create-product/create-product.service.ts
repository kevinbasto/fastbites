import { Injectable } from '@angular/core';
import { Firestore, doc, getDoc, setDoc, updateDoc } from '@angular/fire/firestore';
import { AuthService } from '../../../../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { Product } from '../../../../../core/entities/product';
import { SnackbarService } from '../../../../../core/services/snackbar/snackbar.service';
import { v6 as uuid, v6 } from "uuid";
import { CroppedImage } from '../../../../../core/generics/cropped-image';
import { getDownloadURL, ref, Storage, uploadBytes } from '@angular/fire/storage';
import { NgxImageCompressService } from 'ngx-image-compress';
import { ImagesService } from '../../../../../core/services/images/images.service';
import { ProductCrudServiceService } from '../../../../../core/repos/products-crud-service/product-crud-service.service';


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
    private imagesService: ImagesService,
    private productsServ : ProductCrudServiceService
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
      let uid = await this.auth.getUID() as string;
      let uuid = v6()
      let urls = await this.processImage(uid, uuid, image, cropped);
      product.croppedPosition = cropped.position;
      product.croppedImage = urls.croppedUrl;
      product.rawImage = urls.rawUrl;
      product.uuid = uuid;
      await this.productsServ.createProduct(product);
      this.snackbar.openMessage("Producto creado con éxito!");
      this.goBack()
    } catch (error) {
      throw error;
    }
  }

  /**
   * comprimir el cropped, subir ambas imágenes
   */
  async processImage(uid: string, uuid: string, image: File, cropped: CroppedImage) : Promise<{rawUrl: string, croppedUrl: string}> {
    try {
      let urls = { rawUrl: "", croppedUrl: "" }
      let rawFile = await this.imagesService.prepareImage(uuid, image);
      let croppedFile = await this.imagesService.prepareImage(uuid, cropped.image);
      croppedFile = await this.imagesService.compressImage(croppedFile);
      urls.rawUrl = await this.imagesService.uploadImage(`/${uid}/${uuid}`, rawFile);
      urls.croppedUrl = await this.imagesService.uploadImage(`/${uid}/${uuid}`, croppedFile);
      return urls;
    } catch (error) {
      this.snackbar.openMessage("No se pudo crear el producto solicitado");
      throw error;
    }
  }

}
