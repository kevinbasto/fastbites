import { Component } from '@angular/core';
import { Table } from '../../../../../core/entities/table';
import { MatDialogRef } from '@angular/material/dialog';
import { v6 as uuid } from "uuid";

@Component({
  selector: 'app-create-table',
  templateUrl: './create-table.component.html',
  styleUrl: './create-table.component.scss'
,
  standalone: false})
export class CreateTableComponent {

  constructor(
    private dialogRef: MatDialogRef<CreateTableComponent>
  ) {}

  cancel() {
    this.dialogRef.close()
  }

  submitTable(table: Table) {
    table.id = uuid();
    this.dialogRef.close(table);
  }

}
