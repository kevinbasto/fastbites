import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import QrScanner from 'qr-scanner';

@Component({
  selector: 'qr-scanner',
  templateUrl: './qr-scanner.component.html',
  styleUrl: './qr-scanner.component.scss'
})
export class QrScannerComponent implements OnInit, OnChanges{

  qrScanner!: QrScanner
  
  @Output() scan : EventEmitter<string> = new EventEmitter(); 
  @Input() stop? : boolean;

  constructor() {}

  ngOnInit(): void {
    const videoElem = document.getElementById("viewport");
    this.qrScanner = new QrScanner(
      videoElem as any,
      (result) => this.processScan(result.data),
      {
        highlightScanRegion: true,
        highlightCodeOutline: true,
      },
    );
    this.qrScanner.start()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['stop'])
      this.alternateScanner()
  }

  processScan(data: string){
    this.scan.emit(data);
    const button = document.getElementById("shutter");
      button?.click()
  }

  alternateScanner() {
    if(!this.qrScanner) return;
    if(this.stop)
      this.qrScanner.stop();
    else 
      this.qrScanner.start();
  }
}
