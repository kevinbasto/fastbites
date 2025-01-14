import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Table } from '../../../../../core/entities/table';
import { DIALOG_DATA } from '@angular/cdk/dialog';

@Component({
  selector: 'app-update-table',
  templateUrl: './update-table.component.html',
  styleUrl: './update-table.component.scss'
})
export class UpdateTableComponent {

  table: Table

  constructor(
    private dialogRef: MatDialogRef<UpdateTableComponent>,
    @Inject(MAT_DIALOG_DATA) private data:  {table: Table}
  ) {
    this.table = data.table;
  }

  cancel() {
    this.dialogRef.close()
  }

  submitTable(table: Table) {
    this.dialogRef.close({...this.data.table, ...table});
  }

}
