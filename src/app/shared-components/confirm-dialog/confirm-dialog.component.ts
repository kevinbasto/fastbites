import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss'
,
  standalone: false})
export class ConfirmDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public message: {name: string, message: string},
    public dialogRef: MatDialogRef<ConfirmDialogComponent>
  ) {}
}
