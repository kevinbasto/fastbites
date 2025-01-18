import { Injectable } from '@angular/core';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Menu } from '../../../core/entities/menu';
import { BehaviorSubject } from 'rxjs';
import { docData, docSnapshots, Firestore } from '@angular/fire/firestore';
import { doc, getDoc, setDoc } from '@firebase/firestore';
import { SnackbarService } from '../../../core/services/snackbar/snackbar.service';
import { MenuRepoService } from '../../../core/repos/menu-repo/menu-repo.service';
import { MatDialog } from '@angular/material/dialog';
import { ExportMenuComponent } from './dialogs/export-menu/export-menu.component';
import { DataExporterService } from '../../../core/services/data-exporter/data-exporter.service';
import { ExportFormat } from '../../../core/entities/export-format';
import { ImportMenuComponent } from './dialogs/import-menu/import-menu.component';
import { DataImporterService } from '../../../core/services/data-importer/data-importer.service';
import { ImportFormat } from '../../../core/entities/import-format';


@Injectable({
  providedIn: 'root'
})
export class MenuService {

  menu$: BehaviorSubject<Menu> = new BehaviorSubject<Menu>(null as any);

  constructor(
    private auth: AuthService,
    private firestore: Firestore,
    private snackbar: SnackbarService,
    private menuRepo: MenuRepoService,
    private dialog: MatDialog,
    private exportDataService: DataExporterService,
    private menuImporter: DataImporterService
  ) { }

  async fetchMenu() {
    try {
      let uid = await this.auth.getUID();
      let docRef = doc(this.firestore, `/users/${uid}/data/menu`);
      let docVal = await getDoc(docRef);
      if (!docVal.exists()) {
        let menu: Menu = {
          submenus: [],
          categories: [],
          products: []
        }
        await setDoc(docRef, { ...menu });
      }
      docData(docRef).subscribe((menu: Menu) => this.menu$.next(menu));

    } catch (error) {
      this.snackbar.openMessage('Hubo un error al cargar el menú');
    }
  }

  importMenu() {
    const dialog = this.dialog.open(ImportMenuComponent);
    dialog.afterClosed().subscribe((file: ImportFormat | null) => {
      if (file == null) return;
      this.menuImporter.importMenu(file.file).then(async (menu: Menu) => {
          let uid = await this.auth.getUID();
          this.menuRepo.updateMenu(uid, menu)
            .then(() => this.snackbar.openMessage('Menú importado correctamente'))
            .catch(() => this.snackbar.openMessage(`Hubo un problema al importar el menú`));
      })
      .catch((error) => {
        this.snackbar.openMessage(`Hubo un problema al importar el menú: ${error}`);
      });
    });
  }

  exportMenu(menu?: Menu) {
    const dialog = this.dialog.open(ExportMenuComponent);
    dialog.afterClosed().subscribe((result: ExportFormat | null) => {
      if (!result) return;
      if (!menu) {
        this.snackbar.openMessage('La operación solicitada no es válida');
        return
      }
      this.exportDataService.exportMenu(menu!, result);
    });
  }
}
