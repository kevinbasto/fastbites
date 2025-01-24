import { Injectable } from '@angular/core';
import { doc, docData, Firestore, getDoc, setDoc } from '@angular/fire/firestore';
import { Storage } from '@angular/fire/storage';
import { AuthService } from '../../services/auth/auth.service';
import { Observable, Observer } from 'rxjs';
import { Image } from '../../entities/image';
import { v6 as uuid } from "uuid";

@Injectable({
  providedIn: 'root'
})
export class ImagesRepoService {

  constructor(
    private firestore: Firestore,
    private storage: Storage,
    private auth: AuthService
  ) { }

  // doc: `/users/${uid}/data/gallery`
  fetchImages() {
    return new Observable<Array<Image>>((obs: Observer<Array<Image>>) => {
      this.auth.getUID()
      .then((uid : string) => {
        const docRef = doc(this.firestore, `/users/${uid}/data/gallery`);
        (docData(docRef) as Observable<{ images: Array<Image> }>).subscribe((data) => {
          if(!data){
            setDoc(docRef, { images: [] });
            obs.next([]);
          }else{
            obs.next(data.images);
          }
        });
      }).catch((err) => {
        obs.error(err);
      });
    });
  }

  async getImages() {
    try {
      const uid = await this.auth.getUID();
      const docRef = doc(this.firestore, `/users/${uid}/data/gallery`);
      const docVal = await getDoc(docRef);
      if(docVal.exists())
        return (docVal.data() as {images: Array<Image>}).images;
      await setDoc(docRef, {images: []});
      return [];
    } catch (error) {
      throw error;
    }
  }

  async createImage(image: Image) {
    try {
      image.id = uuid()
      const uid = await this.auth.getUID();
      const docRef = doc(this.firestore, `/users/${uid}/data/gallery`);
      const docVal = await getDoc(docRef);
      if(!docVal.exists()){
        await setDoc(docRef, { images: [image]});
      }else{
        let images = (docVal.data() as {images : Array<Image>}).images;
        images.push(image);
        await setDoc(docRef, {images});
      }
    } catch (error) {
      throw error;
    }
  }

  async updateImage(image: Image) {
    try {
      const uid = await this.auth.getUID();
      const docRef = doc(this.firestore, `/users/${uid}/data/gallery`);
      const docVal = await getDoc(docRef);
      let images = (docVal.data() as { images : Array<Image>}).images;
      images = images.map(img => {
        if(img.id == image.id)
          img = {...img, ...image};
        return image;
      });
      await setDoc(docRef, {images});
    } catch (error) {
      throw error;
    }
  }

  async deleteImage(image: Image) {
    try {
      const uid = await this.auth.getUID();
      const docRef = doc(this.firestore, `/users/${uid}/data/gallery`);
      const docVal = await getDoc(docRef);
      let images = (docVal.data() as { images : Array<Image>}).images;
      images = images.filter(img => img.id != image.id);
      await setDoc(docRef, {images});
    } catch (error) {
      throw error;
    }
  }

  async fetchImagesWithoutId(id : string) {
    try {
      const docRef = doc(this.firestore, `/users/${id}/data/gallery`);
      const docVal = await getDoc(docRef);
      if(docVal.exists())
        return (docVal.data() as {images : Array<Image>}).images;
      else
        return [];
    } catch (error) {
      throw error;
    }
  }

}
