import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private auth: Auth
  ) { }

  signWithEmailAndPassword(email : string, password: string) {
    signInWithEmailAndPassword(this.auth, email, password)
    .then((result) => {
      console.log(result.user.uid);
    }).catch((err) => {
      console.error(err);
    });
    
  }
}
