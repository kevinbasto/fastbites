import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, deleteUser, sendEmailVerification } from '@angular/fire/auth';
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

  async registerWithEmailAndPassword(email: string, password: string, terms: boolean) {
    let givenUser : any;
    try {
      let userRef = (await createUserWithEmailAndPassword(this.auth, email, password)).user;
      let user = {
        email,
        terms,
        uid: userRef.uid,
        verified: false,
        creationDate: Date.now(),
      };
      await sendEmailVerification(userRef)
      .catch(err => { givenUser = userRef; throw err;});
      let docRef = doc(this.firestore, `/users/${userRef.uid}`);
      await setDoc(docRef, user);
      this.snackbar.openMessage("Usuario creado, verifica tu correo");
      this.router.navigate(['/auth/login']);
    } catch (error) {
      await deleteUser(givenUser);
      this.snackbar.openMessage("No se pudo concretar el proceso de registro de tu cuenta");
    }
  }
}
