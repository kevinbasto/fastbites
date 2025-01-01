import { Injectable } from '@angular/core';
import { ProfileRepoService } from '../../../core/repos/profile-repo/profile-repo.service';
import { Profile } from '../../../core/entities/profile';
import { SnackbarService } from '../../../core/services/snackbar/snackbar.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateCardComponent } from './dialogs/create-card/create-card.component';
import { Card } from '../../../core/entities/card';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(
    private profileRepo: ProfileRepoService,
    private snackbar: SnackbarService,
    private dialog: MatDialog,
    private httpclient: HttpClient
  ) { }

  async fetchProfile() {
    try {
      let profile: Profile = await this.profileRepo.fetchProfile()
      return profile;
    } catch (error) {
      throw error;
    }
  }

  // async postProfile(profile: Profile) {
  //   return new Promise<void>((resolve, reject) => {
  //     this.profileRepo.postProfile(profile)
  //     .then(async (result) => {
  //       lastValueFrom(this.httpclient.post(`${environment.apiUrl}/customers`, {...profile}))
  //       .then((result) => {
  //         this.snackbar.openMessage("Perfil Actualizado con éxito");
  //         resolve();
  //       }).catch((err) => {
  //         reject()
  //       });
  //     }).catch((err) => {
  //       this.snackbar.openMessage("No se pudo actualizar el perfil");
  //       reject();
  //     });
  //   })
  // }

  async createCard() {
    const dialog = this.dialog.open(CreateCardComponent)
    dialog.afterClosed().subscribe((card: Card | null) => {
      if(!card) return;

    });
  }
}
