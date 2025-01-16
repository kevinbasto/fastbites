import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'export-form',
  templateUrl: './export-form.component.html',
  styleUrl: './export-form.component.scss'
})
export class ExportFormComponent {

  form: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      format: ['', [Validators.required]],
    });
  }
}
