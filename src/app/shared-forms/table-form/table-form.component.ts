import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Table } from '../../core/entities/table';

@Component({
  selector: 'table-form',
  templateUrl: './table-form.component.html',
  styleUrl: './table-form.component.scss'
,
  standalone: false})
export class TableFormComponent implements OnChanges {

  @Input() table!: Table;

  @Output() tableEvent : EventEmitter<Table> = new EventEmitter();
  @Output() cancelEvent : EventEmitter<void> = new EventEmitter();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      available: [false]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['table'] && this.table){
      const { name, available } = this.table;
      this.form.setValue({name, available});
    }
  }

  cancelForm() {
    this.cancelEvent.emit()
  }

  submitForm() {
    this.tableEvent.emit(this.form.value);
  }
}
