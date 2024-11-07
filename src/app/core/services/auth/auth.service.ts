import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth : Auth
  ) { }

  getUid(){
    return new Promise<string>((resolve, reject) => {
      this.auth.onAuthStateChanged(auth => {
        auth? resolve(auth?.uid?? "") : reject(new Error("not logged in"));
      });
    });
  }

}
