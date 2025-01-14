import { Injectable } from '@angular/core';
import { TablesRepoService } from '../../../core/repos/tables-repo/tables-repo.service';
import { AuthService } from '../../../core/services/auth/auth.service';
import * as qrcode from "qrcode";
import { environment } from '../../../../environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { CreateTableComponent } from './dialogs/create-table/create-table.component';
import { Table } from '../../../core/entities/table';
import { VisualizeQrComponent } from './dialogs/visualize-qr/visualize-qr.component';
import { SnackbarService } from '../../../core/services/snackbar/snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class QrTablesService {

  constructor(
    private tablesRepo: TablesRepoService,
    private auth: AuthService,
    private dialog: MatDialog,
    private snackbar: SnackbarService,
  ) { }

  fetchTables() {
    return this.tablesRepo.observeTables()
  }

  async visualizeQr() {
    const uid = await this.auth.getUID()
    const domain = environment.domain;
    const url = `${domain}/public/menu?id=${uid}`;
    let qr = await qrcode.toDataURL(url);
    const dialog = await this.dialog.open(VisualizeQrComponent, {data: {url, qr}, width: '280px' });
  }

  createTable() {
    const dialog = this.dialog.open(CreateTableComponent);
    dialog.afterClosed().subscribe((table: Table | null) => {
      if(table == null) return;
      this.tablesRepo.createTable(table)
      .then((result) => {
        this.snackbar.openMessage('Mesa Creada con éxito');
      }).catch((err) => {
        this.snackbar.openMessage('Hubo un error creando la mesa');
      });
    });
  }

  visualizeQRWithTable(table: Table) {}

  toggleTable(table: Table) {
    
  }

  updateTable(table: Table) {
    const dialog = this.dialog.open(CreateTableComponent);
    dialog.afterClosed().subscribe((table: Table | null) => {
      if(table == null) return;

    });
  }

  deleteTable(table: Table) {}
}
