import { Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup, signOut } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth : Auth,
  ) { }

  async getUID() : Promise<string>{
    try {
      await this.auth.authStateReady()
      return this.auth.currentUser? this.auth.currentUser.uid : "";
    } catch (error) {
      throw error;
    }
  }

  signOut() {
    signOut(this.auth);
  }

  async getToken() : Promise<string> {
    let token = await this.auth.currentUser?.getIdToken();
    return token!;
  }
}
