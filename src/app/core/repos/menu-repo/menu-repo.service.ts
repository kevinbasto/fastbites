import { Injectable } from '@angular/core';
import { Menu } from '../../entities/menu';
import { Firestore } from '@angular/fire/firestore';
import { doc, getDoc, setDoc } from '@firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class MenuRepoService {

  constructor(
    private firestore: Firestore
  ) { }

  async createNewMenu(uid: string) : Promise<Menu> {
    try {
      let docRef = doc(this.firestore, `/users/${uid}/data/menu`);
      let menu : Menu = { products: [], categories: [] };
      await setDoc(docRef, menu);
      return menu;
    } catch (error) {
      throw error;
    }
  }
  
  async fetchMenu(uid: string) : Promise<Menu | null> {
    try {
      let docRef = doc(this.firestore, `/users/${uid}/data/menu`);
      let document = await getDoc(docRef);
      let menu = document.data() as Menu;
      return menu;
    } catch (error) {
      throw error;
    }
  }

  async updateMenu(uid: string, menu: Menu) {
    try {
      let docRef = doc(this.firestore, `/user/${uid}/data/menu`);
      await setDoc(docRef, menu);
      return menu;
    } catch (error) {
      throw error;
    }
  }

}
