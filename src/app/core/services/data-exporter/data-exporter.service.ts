import { Injectable } from '@angular/core';
import { Menu } from '../../entities/menu';
import { ExportFormat } from '../../entities/export-format';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class DataExporterService {

  constructor() { }

  exportMenu(menu: Menu, exportFormat: ExportFormat) {
    switch (exportFormat.format) {
      case 'xlsx':
        this.exportToExcel(menu, exportFormat.name);
        break;
      case 'json':
        this.exportToJSON(menu, exportFormat.name);
        break;
      default:
        throw new Error('Unsupported export format');
    }
  }

  private exportToExcel(menu: Menu, fileName: string) {
    const worksheet = XLSX.utils.json_to_sheet([menu]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Menu');
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  }

  private exportToJSON(menu: Menu, fileName: string) {
    const json = JSON.stringify(menu, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
  }
}