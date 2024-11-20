import { Component, OnInit } from '@angular/core';
import QrScanner from 'qr-scanner';

@Component({
  selector: 'qr-scanner',
  templateUrl: './qr-scanner.component.html',
  styleUrl: './qr-scanner.component.scss'
})
export class QrScannerComponent implements OnInit{

  qrScanner!: QrScanner

  constructor() {}

  ngOnInit(): void {
    const videoElem = document.getElementById("viewport");
    this.qrScanner = new QrScanner(
      videoElem as any,
      (result : any) => console.log('decoded qr code:', result),
      {
        highlightScanRegion: true,
        highlightCodeOutline: true,
      },
    );
    this.qrScanner.start()
  }
}
