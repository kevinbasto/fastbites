import { Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { SnackbarService } from '../../../core/services/snackbar/snackbar.service';
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { User } from '../../../core/entities/user';

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

  /**
   * que deberia hacer:
   * 1. esta funcion debe verificar que el usuario exista dentro de la base de datos de usuarios
   * 2. debe verificar que el usuario este verificado
   * 3. si el usuario no esta verificado, rechaza el login y automaticamente cierra la sesion
   * 4. si el usuario esta verificado, se iniciara sesion con éxito, pero no esta guardado en db, se manda a actualizar la db
   */
  async signWithEmailAndPassword(email : string, password: string) {
    try {
      let session = await signInWithEmailAndPassword(this.auth, email, password);
      if(!session.user.emailVerified){
        await signOut(this.auth);
        throw new Error("user not verified");
      }
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

  /**
   * que deberia hacer:
   * 1. invoca el popup de inicio de sesion con google
   * 2. con el auth de google se solicita tanto el correo, como el uid,
   * 3. se revisa en firestore si existe el usuario con ese uid
   * 4. si no existe el usuario lo crea en la base de datos
   * nota: la verificacion es automatica cuando se inicia con google porque google ya hizo los procesos de verificacion de usuarios
   */
  async signInWithGoogle() : Promise<any> {
    try {
      let email : string = "";
      let uid : string = "";
      const signRef = await signInWithPopup(this.auth, new GoogleAuthProvider());
      email = signRef.user.email?? "";
      uid = signRef.user.uid;
      let docRef = doc(this.firestore, `/users/${uid}`);
      let data = (await getDoc(docRef)).data()
      let user: User = { 
        uid,
        email,
        terms: true,
        verified: true,
        firstTime: true,
        creationDate: Date.now()
      };
      if(!data)
        await setDoc(docRef, user);
      this.router.navigate(['/client/products']);
    } catch (error) {
      this.snackbar.openMessage("No se pudo iniciar sesión con Google");
      throw error;
    }
  }
}
