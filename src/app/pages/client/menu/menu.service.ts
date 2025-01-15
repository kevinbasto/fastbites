import { Injectable } from '@angular/core';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Menu } from '../../../core/entities/menu';
import { BehaviorSubject } from 'rxjs';
import { docData, docSnapshots, Firestore } from '@angular/fire/firestore';
import { doc, getDoc, setDoc } from '@firebase/firestore';
import { SnackbarService } from '../../../core/services/snackbar/snackbar.service';
import { MenuRepoService } from '../../../core/repos/menu-repo/menu-repo.service';


@Injectable({
  providedIn: 'root'
})
export class MenuService {

  menu$: BehaviorSubject<Menu> = new BehaviorSubject<Menu>(null as any);

  constructor(
    private auth: AuthService,
    private firestore: Firestore,
    private snackbar: SnackbarService,
    private menuRepo: MenuRepoService
  ) { }

  async fetchMenu() {
    try {
      let uid = await this.auth.getUID();
      let docRef = doc(this.firestore, `/users/${uid}/data/menu`);
      let docVal = await getDoc(docRef);
      if(!docVal.exists()){
        let menu: Menu = {
          submenus: [],
          categories: [],
          products: []
        }
        await setDoc(docRef, {...menu});
      }
      docData(docRef).subscribe((menu : Menu) => this.menu$.next(menu));
      
    } catch (error) {
      this.snackbar.openMessage('Hubo un error al cargar el menú');
    }
  }
}
