import { Injectable } from '@angular/core';
import { Submenu } from '../../../../../core/entities/submenu';
import { Message } from '../../../../../core/generics/message';
import { MatDialog } from '@angular/material/dialog';
import { SubmenusRepoService } from '../../../../../core/repos/submenus-repo/submenus-repo.service';
import { ConfirmDialogComponent } from '../../../../../shared-components/confirm-dialog/confirm-dialog.component';
import { ViewSubmenuComponent } from '../../dialogs/view-submenu/view-submenu.component';
import { SnackbarService } from '../../../../../core/services/snackbar/snackbar.service';
import { Menu } from '../../../../../core/entities/menu';

@Injectable({
  providedIn: 'root'
})
export class SubmenusService {

  constructor(
    private matDialog: MatDialog,
    private submenusRepo: SubmenusRepoService,
    private snackbar: SnackbarService,
  ) { }

  viewSubmenu(submenu: Submenu, menu: Menu) {
    const dialog = this.matDialog.open(ViewSubmenuComponent, { data: { submenu, menu } });
  }

  deleteSubmenu(submenu: Submenu) {
    const message: Message = {
      name: '¿Borrar Sub-menú?',
      message: 'Una vez hecha esta acción no se puede deshacer'
    };
    const dialog = this.matDialog.open(ConfirmDialogComponent, { data: { ...message } });
    dialog.afterClosed().subscribe((confirmation: boolean) => {
      if(!confirmation) return;
      this.submenusRepo.deletesubmenu(submenu)
      .then((result) => {
        this.snackbar.openMessage('Submenu borrado con éxito');
      }).catch((err) => {
        this.snackbar.openMessage('No se pudo borrar el submenú');
      });
    })
  }

  toggleSubmenu(submenu: Submenu) { 
    console.log(`invoked`)
    submenu.available = !submenu.available;
    this.submenusRepo.updatesubmenu(submenu)
    .then((result) => {
      this.snackbar.openMessage('Submenú actualizado con éxito');
    }).catch((err) => {
      this.snackbar.openMessage('No se pudo actualizar el submenú');
    });
  }
}
