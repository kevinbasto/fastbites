import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { TableColumn } from '../../core/generics/table-column';
import { TableConfig } from '../../core/generics/table-config';
import { MatTable } from '@angular/material/table';
import { Product } from '../../core/entities/product';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnChanges{

  @ViewChild(MatTable) table!: MatTable<Product>;

  //table inputs
  @Input() title? : string;
  @Input() data? : Array<any>;
  @Input() headers? : Array<TableColumn>;
  @Input() setSize : number = 0;
  @Input() config? : TableConfig

  pageSize = 10

  // table outputs
  @Output() create : EventEmitter<null> = new EventEmitter();
  @Output() edit : EventEmitter<any> = new EventEmitter();
  @Output() deleteItem : EventEmitter<any> = new EventEmitter();
  @Output() pageEvent : EventEmitter<PageEvent> = new EventEmitter();
  @Output() toggle: EventEmitter<any> = new EventEmitter();
  @Output() order: EventEmitter<null> = new EventEmitter();

  privDisplayColumns: string[] = [];
  displayedColumns: string[] = [];
  dataSource : Array<any> = [];

  constructor(
    private breakpointObserver : BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.breakpointObserver.observe(['(max-width: 600px)']).subscribe((res: BreakpointState) => {
      if(res.matches){
        let first = this.displayedColumns[0];
        let last = this.displayedColumns[this.displayedColumns.length - 1];
        this.displayedColumns = [first, last];
      }else{
        this.displayedColumns = this.privDisplayColumns;
      }
    });
  }

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
    if(this.config?.options)
      this.displayedColumns.push('options')
    this.privDisplayColumns = this.displayedColumns;
  }


}
