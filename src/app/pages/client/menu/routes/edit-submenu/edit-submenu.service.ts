import { Injectable } from '@angular/core';
import { AuthService } from '../../../../../core/services/auth/auth.service';
import { MenuRepoService } from '../../../../../core/repos/menu-repo/menu-repo.service';
import { SnackbarService } from '../../../../../core/services/snackbar/snackbar.service';
import { SubmenusRepoService } from '../../../../../core/repos/submenus-repo/submenus-repo.service';
import { Menu } from '../../../../../core/entities/menu';
import { Submenu } from '../../../../../core/entities/submenu';

@Injectable({
  providedIn: 'root'
})
export class EditSubmenuService {

  constructor(
    private auth: AuthService,
    private menuRepo: MenuRepoService,
    private snackbar: SnackbarService,
    private submenuRepo: SubmenusRepoService
  ) { }

  async fetchMenu() {
    try {
      let uid = await this.auth.getUID();
      let menu: Menu = (await this.menuRepo.fetchMenu(uid))!;
      return menu;
    } catch (error) {
      this.snackbar.openMessage('Hubo un error con la solicitud');
      throw error;
    }
  }

  async editSubmenu(submenu: Submenu) {
    return this.submenuRepo.updatesubmenu(submenu);
  }
}
