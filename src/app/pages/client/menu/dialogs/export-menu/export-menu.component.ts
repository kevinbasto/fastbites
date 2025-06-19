import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ExportFormat } from '../../../../../core/entities/export-format';

@Component({
  selector: 'app-export-menu',
  templateUrl: './export-menu.component.html',
  styleUrl: './export-menu.component.scss'
,
  standalone: false})
export class ExportMenuComponent {

  constructor(
    private dialogRef: MatDialogRef<ExportMenuComponent>
  ) {}

  cancelExport() {
    this.dialogRef.close();
  }

  submitExport(exportFormat: ExportFormat) {
    this.dialogRef.close(exportFormat);
  }
}
