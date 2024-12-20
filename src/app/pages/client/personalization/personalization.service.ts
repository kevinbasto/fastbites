import { Injectable } from '@angular/core';
import { doc, Firestore, getDoc, setDoc, updateDoc } from '@angular/fire/firestore';
import { SnackbarService } from '../../../core/services/snackbar/snackbar.service';
import { AuthService } from '../../../core/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PersonalizationService {

  constructor(
    private auth: AuthService,
    private firestore: Firestore,
    private snackbar: SnackbarService
  ) { }

  saveColorForm(color: string) : Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        let uid: string = await this.auth.getUID();
        let docRef = doc(this.firestore, `/users/${uid}/data/profile`);
        let docsnap = await getDoc(docRef);
        if(!docsnap.exists())
          await setDoc(docRef, {color});
        else
          await updateDoc(docRef, { color });
        this.snackbar.openMessage("Color guardado con éxito");
        resolve();
      } catch (error) {
        this.snackbar.openMessage("Hubo un error al procesar el color");
        reject();
      }
    })
  }
}
