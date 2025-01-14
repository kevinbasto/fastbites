import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Table } from '../../core/entities/table';

@Component({
  selector: 'table-form',
  templateUrl: './table-form.component.html',
  styleUrl: './table-form.component.scss'
})
export class TableFormComponent {

  @Output() tableEvent : EventEmitter<Table> = new EventEmitter()
  @Output() cancelEvent : EventEmitter<void> = new EventEmitter()

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      available: [false]
    });
  }

  cancelForm() {
    this.cancelEvent.emit()
  }

  submitForm() {
    this.tableEvent.emit(this.form.value);
  }
}
