import { Injectable } from '@angular/core';
import { ProfileRepoService } from '../../../core/repos/profile-repo/profile-repo.service';
import { Profile } from '../../../core/entities/profile';
import { SnackbarService } from '../../../core/services/snackbar/snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(
    private profileRepo: ProfileRepoService,
    private snackbar: SnackbarService
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
    return new Promise<void>((resolve, reject) => {
      this.profileRepo.postProfile(profile)
      .then((result) => {
        this.snackbar.openMessage("Perfil Actualizado con éxito");
        resolve();
      }).catch((err) => {
        this.snackbar.openMessage("No se pudo actualizar el perfil");
        reject();
      });
    })
  }
}
