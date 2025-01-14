import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-visualize-qr',
  templateUrl: './visualize-qr.component.html',
  styleUrl: './visualize-qr.component.scss'
})
export class VisualizeQrComponent {

  url : string;
  qr: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) data : { url: string, qr: string },
    private dialogRef: MatDialogRef<VisualizeQrComponent>
  ) {
    this.url = data.url,
    this.qr = data.qr;
  }

  close() {
    this.dialogRef.close();
  }

}
