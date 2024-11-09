import { Injectable } from '@angular/core';
import { Auth, signOut } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth : Auth
  ) { }

  async getUID() : Promise<string | null>{
    try {
      await this.auth.authStateReady()
      return this.auth.currentUser? this.auth.currentUser.uid : null;
    } catch (error) {
      throw error;
    }
  }

  signOut() {
    signOut(this.auth);
  }
}
