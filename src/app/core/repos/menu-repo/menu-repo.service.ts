import { Injectable } from '@angular/core';
import { Menu } from '../../entities/menu';
import { Firestore } from '@angular/fire/firestore';
import { doc, getDoc } from '@firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class MenuRepoService {

  constructor(
    private firestore: Firestore
  ) { }

  async createNewMenu() {}
  
  async fetchMenu(uid: string) : Promise<Menu> {
    try {
      let menu!: Menu;
      let docRef = doc(this.firestore, `/user/${uid}/data/menu`);
      let document = await getDoc(docRef);
      if(!document.exists())
        throw new Error("No existe el documento solicitado");
      else
        menu = document.data() as Menu;
      return menu;
    } catch (error) {
      throw error;
    }
  }

  updateMenu(menu: Menu) {}

}
