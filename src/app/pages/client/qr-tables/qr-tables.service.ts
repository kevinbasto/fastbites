import { Injectable } from '@angular/core';
import { TablesRepoService } from '../../../core/repos/tables-repo/tables-repo.service';
import { AuthService } from '../../../core/services/auth/auth.service';
import * as qrcode from "qrcode";
import { environment } from '../../../../environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { CreateTableComponent } from './dialogs/create-table/create-table.component';
import { Table } from '../../../core/entities/table';
import { VisualizeQrComponent } from './dialogs/visualize-qr/visualize-qr.component';

@Injectable({
  providedIn: 'root'
})
export class QrTablesService {

  constructor(
    private tablesRepo: TablesRepoService,
    private auth: AuthService,
    private dialog: MatDialog,
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

    });
  }

  visualizeQRWithTable(table: Table) {}

  updateTable(table: Table) {}

  deleteTable(table: Table) {}
}
