import { Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { SnackbarService } from '../../../core/services/snackbar/snackbar.service';
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private auth: Auth,
    private firestore : Firestore,
    private router : Router,
    private snackbar: SnackbarService
  ) { }

  async signWithEmailAndPassword(email : string, password: string) {
    try {
      let session = await signInWithEmailAndPassword(this.auth, email, password);
      if(!session.user.emailVerified)
        throw new Error("user not verified");
      let docRef = doc(this.firestore,`/users/${session.user.uid}`);
      let user : any = (await getDoc(docRef)).data();
      if(!user.verified)
        user.verified= true;
      await setDoc(docRef, user);
      this.router.navigate(["/client/products"]);
    } catch (error) {
      this.snackbar.openMessage("no se pudo iniciar sesión, revisa tus credenciales y reintenta de nuevo mas tarde");
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
      if(!data)
        await setDoc(docRef, {email, uid, terms: true, verified: true});
      this.router.navigate(['/client/products']);
    } catch (error) {
      this.snackbar.openMessage("No se pudo iniciar sesión con Google");
      throw error;
    }
  }
}
