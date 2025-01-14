import { Injectable } from '@angular/core';
import { Submenu } from '../../../../../core/entities/submenu';
import { Message } from '../../../../../core/generics/message';
import { MatDialog } from '@angular/material/dialog';
import { SubmenusRepoService } from '../../../../../core/repos/submenus-repo/submenus-repo.service';
import { ConfirmDialogComponent } from '../../../../../shared-components/confirm-dialog/confirm-dialog.component';
import { ViewSubmenuComponent } from '../../dialogs/view-submenu/view-submenu.component';

@Injectable({
  providedIn: 'root'
})
export class SubmenusService {

  constructor(
    private matDialog: MatDialog,
    private submenusRepo: SubmenusRepoService
  ) { }

  viewSubmenu(submenu: Submenu) {
    const dialog = this.matDialog.open(ViewSubmenuComponent, { data: { submenu } });
  }

  deleteSubmenu(submenu: Submenu) {
    const message: Message = {
      name: '¿Borrar Sub-menú?',
      message: 'Una vez hecha esta acción no se puede deshacer'
    };
    const dialog = this.matDialog.open(ConfirmDialogComponent, { data: { ...message } });
  }

  toggleSubmenu(submenu: Submenu) { }
}
