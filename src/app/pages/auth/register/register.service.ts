import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, deleteUser, GoogleAuthProvider, sendEmailVerification, signInWithPopup } from '@angular/fire/auth';
import { doc, Firestore, getDoc, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { SnackbarService } from '../../../core/services/snackbar/snackbar.service';
import { User } from '../../../core/entities/user';

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
      let user : User = {
        email,
        terms,
        uid: userRef.uid,
        verified: false,
        creationDate: Date.now(),
        firstTime: true
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

  async signInWithGoogle() : Promise<any> {
    try {
      let email : string = "";
      let uid : string = "";
      const signRef = await signInWithPopup(this.auth, new GoogleAuthProvider());
      email = signRef.user.email?? "";
      uid = signRef.user.uid;
      let docRef = doc(this.firestore, `/users/${uid}`);
      let data = (await getDoc(docRef)).data()
      if(!data){
        let user: User = { 
          uid,
          email,
          terms: true,
          verified: true,
          firstTime: true,
          creationDate: Date.now()
        }; 
        await setDoc(docRef, user);
      }
      this.router.navigate(['/client/products']);
    } catch (error) {
      this.snackbar.openMessage("No se pudo iniciar sesión con Google");
      throw error;
    }
  }
}
