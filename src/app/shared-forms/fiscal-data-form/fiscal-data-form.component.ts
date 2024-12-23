import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'fiscal-data-form',
  templateUrl: './fiscal-data-form.component.html',
  styleUrl: './fiscal-data-form.component.scss'
})
export class FiscalDataFormComponent implements OnInit, OnChanges {

  @Input() enable: boolean = false;

  constructor() {}

  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    
  }
}
