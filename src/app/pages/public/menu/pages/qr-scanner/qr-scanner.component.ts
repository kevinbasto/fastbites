import { Component, OnInit } from '@angular/core';
import { QrScannerService } from './qr-scanner.service';
import { MenuService } from '../../menu.service';

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.component.html',
  styleUrl: './qr-scanner.component.scss'
,
  standalone: false})
export class QrScannerComponent implements OnInit {

  stop: boolean = false;
  activeFetch: boolean = false;

  constructor(
    private qrScannerService: QrScannerService,
    private menuService: MenuService
  ) {}

  ngOnInit(): void {
    
  }

  processScan(scan: string) {
    if (!this.activeFetch) {
      this.activeFetch = true;
      this.qrScannerService.processScan(scan)
      .then((id : string) => {
        this.menuService.setMenu(id);
      });
    }
  }
}
