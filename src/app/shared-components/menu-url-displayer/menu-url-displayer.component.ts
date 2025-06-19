import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  templateUrl: './menu-url-displayer.component.html',
  styleUrl: './menu-url-displayer.component.scss'
,
  standalone: false})
export class MenuUrlDisplayerComponent {

  url: string;
  qr: string

  constructor(
    public dialogRef: MatDialogRef<MenuUrlDisplayerComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { url : string, qr: string }
  ) {
    this.url = this.data.url;
    this.qr = this.data.qr
  }

  navigateToMenu() {
    window.open(this.url, '_blank')
  }

}
