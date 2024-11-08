import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { TableColumn } from '../../core/generics/table-column';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {

  //table inputs
  @Input() title? : string;
  @Input() data? : Array<any>;
  @Input() headers? : Array<TableColumn>;
  @Input() setSize : number = 0;

  pageSize = 10

  // table outputs
  @Output() create : EventEmitter<null> = new EventEmitter();
  @Output() edit : EventEmitter<any> = new EventEmitter();
  @Output() deleteItem : EventEmitter<any> = new EventEmitter();
  @Output() pageEvent : EventEmitter<PageEvent> = new EventEmitter();

  displayedColumns: string[] = [];
  dataSource : Array<any> = [];

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['headers'])
      this.setHeaders()

    if(changes['data'])
      this.dataSource = this.data!
  }

  setHeaders(){
    this.displayedColumns = [];
    for(let header of this.headers!)
      this.displayedColumns.push(header.name);
    this.displayedColumns.push('options')
  }


}
