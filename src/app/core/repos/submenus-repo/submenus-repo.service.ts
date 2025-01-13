import { Injectable } from '@angular/core';
import { MenuRepoService } from '../menu-repo/menu-repo.service';
import { AuthService } from '../../services/auth/auth.service';
import { Submenu } from '../../entities/submenu';

@Injectable({
  providedIn: 'root'
})
export class SubmenusRepoService {

  uid!: string;

  constructor(
    private menuRepo: MenuRepoService,
    private authServ: AuthService
  ) { }

  async createsubmenu(submenu: Submenu) {
    try {
      let uid = await this.authServ.getUID();
      let submenus = (await this.menuRepo.fetchMenu(uid))?.submenus;
      submenus?.push(submenu);
      await this.menuRepo.updateMenu(uid, { submenus });
    } catch (error) {
      throw error;
    }
  }

  async updatesubmenu(submenu: Submenu) {
    try {
      let uid: string = await this.authServ.getUID();
      let submenus = (await this.menuRepo.fetchMenu(uid))?.submenus;
      submenus = submenus?.map((sub: Submenu) => {
        if (submenu.id == submenu.id) sub = submenu;
        return sub;
      });
      await this.menuRepo.updateMenu(uid, { submenus });
    } catch (error) {
      throw error;
    }
  }

  async deletesubmenu(submenu: Submenu) {
    try {
      let uid = await this.authServ.getUID();
      let submenus = (await this.menuRepo.fetchMenu(uid))?.submenus;
      submenus = submenus?.filter((submenu: Submenu) => submenu.id != submenu.id);
      await this.menuRepo.updateMenu(uid, { submenus });
    } catch (error) {
      throw error;
    }
  }
}
