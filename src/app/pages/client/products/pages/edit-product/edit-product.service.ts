import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { AuthService } from '../../../../../core/services/auth/auth.service';
import { Storage, getBytes, ref } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { SnackbarService } from '../../../../../core/services/snackbar/snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class EditProductService {

  constructor(
    private firestore: Firestore,
    private auth: AuthService,
    private storage: Storage,
    private router : Router,
    private snackbar: SnackbarService
  ) { }

  goBack(){
    this.router.navigate([`/client/products`]);
  }

  async fetchImage(uuid : string) {
    try {
      let uid = await this.auth.getUID();
      let docRef = ref(this.storage, `/${uuid}/${uid}/${uuid}-raw.jpg`);
      getBytes(docRef);
    } catch (error) {
      throw error;
    }
  }
}
