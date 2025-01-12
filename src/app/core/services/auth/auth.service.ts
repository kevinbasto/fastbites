import { Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth : Auth,
    private router: Router
  ) { }

  async getUID() : Promise<string>{
    try {
      await this.auth.authStateReady()
      return this.auth.currentUser? this.auth.currentUser.uid : "";
    } catch (error) {
      throw error;
    }
  }

  async getEmail() : Promise<string>{
    try {
      await this.auth.authStateReady()
      return this.auth.currentUser? this.auth.currentUser.email! : "";
    } catch (error) {
      throw error;
    }
  }

  signOut() {
    window.localStorage.removeItem("profile");
    signOut(this.auth);
    this.router.navigate(['/auth/login']);
  }

  async getToken() : Promise<string> {
    let token = await this.auth.currentUser?.getIdToken();
    return token!;
  }
}
