import { Injectable } from '@angular/core';
import { MenuRepoService } from '../../../core/repos/menu-repo/menu-repo.service';

@Injectable({
  providedIn: 'root'
})
export class OrderSlipservice {

  constructor(
    private menuRepo: MenuRepoService
  ) { }

  fetchMenu() {
    return this.menuRepo.ObserveMenu();
  }
  
}
