import { Injectable } from '@angular/core';
import { TablesRepoService } from '../../../core/repos/tables-repo/tables-repo.service';
import { AuthService } from '../../../core/services/auth/auth.service';
import * as qrcode from "qrcode";
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QrTablesService {

  constructor(
    private tablesRepo: TablesRepoService,
    private auth: AuthService
  ) { }

  fetchTables() {
    return this.tablesRepo.observeTables()
  }

  async visualizeQr() {
    const domain = environment.domain;
    const url = `${domain}/public/menu`;
    let qr = await qrcode.toDataURL(url);
    
  }

  createTable() {}

  visualizeQRWithTable() {}

  updateTable() {}

  deleteTable() {}
}
