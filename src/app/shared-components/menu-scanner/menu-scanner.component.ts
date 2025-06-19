import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'menu-scanner',
  templateUrl: './menu-scanner.component.html',
  styleUrl: './menu-scanner.component.scss'
,
  standalone: false})
export class MenuScannerComponent {

  @Output() scan : EventEmitter<string> = new EventEmitter<string>();

  @Input() stop: boolean = false;

  processScan(scan: string) {
    this.scan.emit(scan);
  }
}
