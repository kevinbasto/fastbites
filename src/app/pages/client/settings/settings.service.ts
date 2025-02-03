import { Injectable } from '@angular/core';
import { ProfileRepoService } from '../../../core/repos/profile-repo/profile-repo.service';
import { Profile } from '../../../core/entities/profile';
import { SnackbarService } from '../../../core/services/snackbar/snackbar.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateCardComponent } from './dialogs/create-card/create-card.component';
import { Card } from '../../../core/entities/card';
import { doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { AuthService } from '../../../core/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(
    private profileRepo: ProfileRepoService,
    private dialog: MatDialog,
    private auth: AuthService,
    private firestore: Firestore,
    private snackbarService: SnackbarService
  ) { }

  async fetchProfile() {
    try {
      let profile: Profile = await this.profileRepo.fetchProfile()
      return profile;
    } catch (error) {
      throw error;
    }
  }

  async postProfile(profile: Profile) {
    try {
      let uid = await this.auth.getUID();
      let profdoc = doc(this.firestore, `/users/${uid}/data/profile`);
      updateDoc(profdoc, {...profile});
    } catch (error) {
      throw error;
    }
  }

  async createCard() {
    const dialog = this.dialog.open(CreateCardComponent)
    dialog.afterClosed().subscribe((card: Card | null) => {
      if(!card) return;

    });
  }
}
