import { Injectable } from '@angular/core';
import { Menu } from '../../entities/menu';
import { Firestore, updateDoc } from '@angular/fire/firestore';
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
      let menu : Menu = { products: [], categories: [], submenus: [] };
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

  async updateMenu(uid: string, menu: Partial<Menu>) {
    try {
      let docRef = doc(this.firestore, `/users/${uid}/data/menu`);
      await updateDoc(docRef, {...menu});
      return menu;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

}
