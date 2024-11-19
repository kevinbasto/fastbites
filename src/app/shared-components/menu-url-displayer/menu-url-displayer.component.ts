import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  templateUrl: './menu-url-displayer.component.html',
  styleUrl: './menu-url-displayer.component.scss'
})
export class MenuUrlDisplayerComponent {

  constructor(
    private dialogRef: MatDialogRef<MenuUrlDisplayerComponent>,
    @Inject(MAT_DIALOG_DATA) data: { url : string, qr: any}
  ) {}
}
