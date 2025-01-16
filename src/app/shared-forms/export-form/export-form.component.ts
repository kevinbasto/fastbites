import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExportFormat } from '../../core/entities/export-format';


@Component({
  selector: 'export-form',
  templateUrl: './export-form.component.html',
  styleUrl: './export-form.component.scss'
})
export class ExportFormComponent {

  @Output() cancel = new EventEmitter<void>();
  @Output() submitExport = new EventEmitter<ExportFormat>();

  form: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      format: ['', [Validators.required]],
    });
  }

  cancelForm() {
    this.cancel.emit();
  }

  submitForm() {
    this.submitExport.emit(this.form.value);
  }
}
