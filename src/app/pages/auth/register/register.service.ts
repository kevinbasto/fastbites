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

  /**
   * esta function que hace:
   * 1. verifica que el usuario pueda ser creado con los servicios de google
   * 2. crea el documento de registro del usuario
   * 3. envia correo de de verificacion
   * 4. si el correo de verificacion no se envia tira error
   * 5.si se envia con exito, se notifica al usuario y se manda a verificar el correo para inciar sesion
   */
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
        firstTime: true,
        active:false
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

  /**
   * al registrarse con google:
   * 1. se verifica que se pudo crear con google,
   * 2. se manda a registrar al usuario, 
   * 3. se redirige a client
  */
  async signInWithGoogle() : Promise<any> {
    try {
      const signRef = await signInWithPopup(this.auth, new GoogleAuthProvider());
      const {email, uid} = signRef.user;
      let docRef = doc(this.firestore, `/users/${uid}`);
      let data = (await getDoc(docRef)).data()
      if(!data){
        let user: User = { 
          uid,
          email: email!,
          terms: true,
          verified: true,
          firstTime: true,
          creationDate: Date.now(),
          active: false
        }; 
        const {firstTime} = user;
        window.localStorage.setItem('profile', JSON.stringify({firstTime}))
        await setDoc(docRef, user);
      }
      this.router.navigate(['/client/menu']);
    } catch (error) {
      this.snackbar.openMessage("No se pudo iniciar sesión con Google");
      throw error;
    }
  }
}
