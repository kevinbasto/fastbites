import { Injectable } from '@angular/core';
import { doc, Firestore, getDoc, setDoc } from '@angular/fire/firestore';
import { AuthService } from '../../services/auth/auth.service';
import { Profile } from '../../entities/profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileRepoService {

  constructor(
    private firestore: Firestore,
    private auth: AuthService
  ) { }

  async fetchProfile() {
    try {
      let uid = await this.auth.getUID();
      let docRef = doc(this.firestore, `/users/${uid}/data/profile`);
      let docVal = await getDoc(docRef);
      return docVal.data() as unknown as Profile;
    } catch (error) {
      throw error;
    }
  }

  async postProfile(profile: Profile) {
    try {
      let uid = await this.auth.getUID();
      let docRef = doc(this.firestore, `/users/${uid}/data/profile`);
      await setDoc(docRef, profile);
    } catch (error) {
      throw error;
    }
  }
}
