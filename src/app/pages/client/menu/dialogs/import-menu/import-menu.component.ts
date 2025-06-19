import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ImportFormat } from '../../../../../core/entities/import-format';

@Component({
  selector: 'app-import-menu',
  templateUrl: './import-menu.component.html',
  styleUrl: './import-menu.component.scss'
,
  standalone: false})
export class ImportMenuComponent {

  constructor(
    private dialogRef: MatDialogRef<ImportMenuComponent>
  ) {}

  cancel() {
    this.dialogRef.close(null);
  }

  import(file: ImportFormat) {
    this.dialogRef.close(file);
  }

}
