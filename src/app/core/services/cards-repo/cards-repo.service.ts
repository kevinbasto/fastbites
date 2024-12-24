import { Injectable } from '@angular/core';
import { doc, Firestore, getDoc } from '@angular/fire/firestore';
import { AuthService } from '../auth/auth.service';
import { CardMethod } from '../../entities/card-method';

@Injectable({
  providedIn: 'root'
})
export class CardsRepoService {

  constructor(
    private firestore: Firestore,
    private auth: AuthService
  ) { }

  async fetchCards() {
    try {
      let uid = await this.auth.getUID();
      let docRef = doc(this.firestore, `/users/${uid}/data/cards`);
      let docVal = await getDoc(docRef);
      return (docVal.data() as unknown as { cards: Array<CardMethod> }).cards;
    } catch (error) {
      throw error;
    }
  }
}
