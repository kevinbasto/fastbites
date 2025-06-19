import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-visualize-qr',
  templateUrl: './visualize-qr.component.html',
  styleUrl: './visualize-qr.component.scss'
,
  standalone: false})
export class VisualizeQrComponent {

  url : string;
  qr: string;
  hideUrl : boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) data : { url: string, qr: string, hideUrl? : boolean },
    private dialogRef: MatDialogRef<VisualizeQrComponent>
  ) {
    this.url = data.url,
    this.qr = data.qr;
    this.hideUrl = data.hideUrl!;
  }

  close() {
    this.dialogRef.close();
  }

}
