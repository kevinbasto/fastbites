import { Injectable } from '@angular/core';
import { doc, Firestore, getDoc, setDoc, updateDoc } from '@angular/fire/firestore';
import { SnackbarService } from '../../../core/services/snackbar/snackbar.service';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Personalization } from '../../../core/entities/personalization';
import { ImagesService } from '../../../core/services/images/images.service';
import { v6 as uuid } from "uuid";


@Injectable({
  providedIn: 'root'
})
export class PersonalizationService {

  constructor(
    private auth: AuthService,
    private firestore: Firestore,
    private snackbar: SnackbarService,
    private imagesService: ImagesService
  ) { }

  async loadPersonalization() {
    try {
      const uid = await this.auth.getUID();
      const docRef = doc(this.firestore, `/users/${uid}/data/personalization`);
      return (await getDoc(docRef)).data() as Personalization;
    } catch (error) {
      throw error;
    }
  }

  // file: /users/${uid}/data/personalization
  async savePersonalization(customization: Personalization) {
    try {
      let uid = await this.auth.getUID();
      let path = `/${uid}/personalization`
      let { logo, ...company } = customization.company;
      let { background, ...personalization } = customization.personalization;
      let logoUrl = '';
      let backgroundUrl = '';
      if (logo instanceof File) {
        const logoName = uuid();
        logo = await this.imagesService.prepareImage(logoName, logo);
        logo = await this.imagesService.compressImage(logo);
        logoUrl = await this.imagesService.uploadImage(path, logo);
      }
      if (background instanceof File) {
        const backgroundName = uuid();
        background = await this.imagesService.prepareImage(backgroundName, background);
        background = await this.imagesService.compressImage(background);
        backgroundUrl = await this.imagesService.uploadImage(path, background);
      }
      if (logoUrl)
        customization.company = { ...company, logo: logoUrl };
      if (backgroundUrl)
        customization.personalization = { ...personalization, background: backgroundUrl };
      let docRef = doc(this.firestore, `/users/${uid}/data/personalization`);
      await setDoc(docRef, customization);
    } catch (error) {
      throw error;
    }
  }
}
