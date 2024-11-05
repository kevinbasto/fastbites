import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, sendEmailVerification } from '@angular/fire/auth';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { SnackbarService } from '../../../core/services/snackbar/snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    private auth : Auth,
    private firestore: Firestore,
    private router : Router,
    private snackbar: SnackbarService
  ) { }

  registerWithEmailAndPassword(email: string, password: string, terms: boolean) {
    createUserWithEmailAndPassword(this.auth, email, password)
    .then(async (result) => {
      let uid = result.user.uid;
      let docref = await doc(this.firestore, `/users/${uid}`);
      await sendEmailVerification(result.user);
      await setDoc(docref, {email, uid, terms });
      this.snackbar.openMessage("Registro completado con éxito");
    }).catch((err) => {
      this.snackbar.openMessage("No se pudo completar el registro");
    });
  }
}
