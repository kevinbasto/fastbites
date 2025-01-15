import { Injectable } from '@angular/core';
import { doc, Firestore, getDoc, setDoc, updateDoc } from '@angular/fire/firestore';
import { SnackbarService } from '../../../core/services/snackbar/snackbar.service';
import { AuthService } from '../../../core/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PersonalizationService {

  constructor(
    private auth: AuthService,
    private firestore: Firestore,
    private snackbar: SnackbarService
  ) { }

  // file: /users/${uid}/data/personalization
  saveColorForm(color: string) : Promise<void> {
    return new Promise<void>(async (resolve, reject) => {});
  }
}
