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
import { UpdateTableComponent } from './dialogs/update-table/update-table.component';
import { Message } from '../../../core/generics/message';
import { ConfirmDialogComponent } from '../../../shared-components/confirm-dialog/confirm-dialog.component';

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

  async visualizeQRWithTable(table: Table) {
    const uid = await this.auth.getUID()
    const domain = environment.domain;
    const url = `${domain}/public/menu?id=${uid}&table=${table.id}`;
    let qr = await qrcode.toDataURL(url);
    const dialog = await this.dialog.open(VisualizeQrComponent, {data: {url, qr}, width: '280px' });
  }

  toggleTable(table: Table) {
    table.available = !table.available;
    this.tablesRepo.updateTable(table)
    .then((result) => {
      this.snackbar.openMessage('Mesa actualizada con éxito');
    }).catch((err) => {
      this.snackbar.openMessage('No se pudo actualizar la mesa');
    });
  }

  updateTable(table: Table) {
    const dialog = this.dialog.open(UpdateTableComponent, {data: { table }});
    dialog.afterClosed().subscribe((table: Table | null) => {
      if(table == null) return;
      this.tablesRepo.updateTable(table)
      .then((result) => {
        this.snackbar.openMessage('Mesa actualizada con éxito');
      }).catch((err) => {
        this.snackbar.openMessage('No se pudo actualizar la mesa');
      });
    });
  }

  deleteTable(table: Table) {
    const message: Message = {
      name: '¿Borrar Mesa?',
      message: 'Una vez hecha esta acción no se podrá deshacer'
    };
    const dialog = this.dialog.open(ConfirmDialogComponent, { data: {...message}});
    dialog.afterClosed().subscribe((confirmation: boolean) => {
      if(!confirmation) return;
      this.tablesRepo.deleteTable(table)
      .then((result) => {
        this.snackbar.openMessage('Mesa borrada con éxito');
      }).catch((err) => {
        this.snackbar.openMessage('No se pudo borrar la mesa');
      });
    })
  }
}
