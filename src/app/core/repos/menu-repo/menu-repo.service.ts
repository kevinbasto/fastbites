import { Injectable } from '@angular/core';
import { Menu } from '../../entities/menu';
import { docData, Firestore, updateDoc } from '@angular/fire/firestore';
import { doc, getDoc, setDoc } from '@firebase/firestore';
import { Observable, Observer } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MenuRepoService {

  constructor(
    private firestore: Firestore,
    private auth: AuthService
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

  ObserveMenu() : Observable<Menu> {
    return new Observable<Menu>((obs: Observer<Menu>) => {
      this.auth.getUID()
      .then((uid) => {
        let docRef = doc(this.firestore, `/users/${uid}/data/menu`);
        (docData(docRef) as Observable<Menu>).subscribe((menu : Menu) => obs.next(menu));
      }).catch((err) => {
        obs.error(err);
      });
    });
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
      throw error;
    }
  }

}
