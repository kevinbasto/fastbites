import { Component, OnInit } from '@angular/core';
import { QrTablesService } from './qr-tables.service';
import { Table } from '../../../core/entities/table';
import { QrTablesTableConfig, QrTablesTableHeaders } from './qr-tables-table.header';

@Component({
  selector: 'app-qr-tables',
  templateUrl: './qr-tables.component.html',
  styleUrl: './qr-tables.component.scss'
})
export class QrTablesComponent implements OnInit {

  headers = QrTablesTableHeaders;
  config = QrTablesTableConfig;
  tables?: Array<Table>;

  constructor(
    private qrTablesService: QrTablesService
  ) {}

  ngOnInit(): void {
    this.qrTablesService.fetchTables().subscribe(tables => {
      console.log(tables);
      this.tables = tables;
    });
  }

  visualizeCode() {}

}
