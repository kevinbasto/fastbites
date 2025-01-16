import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImportFormat } from '../../core/entities/import-format';

@Component({
  selector: 'file-importer-form',
  templateUrl: './file-importer-form.component.html',
  styleUrl: './file-importer-form.component.scss'
})
export class FileImporterFormComponent implements OnInit {
  @Output() cancel: EventEmitter<void> = new EventEmitter();
  @Output() import: EventEmitter<ImportFormat> = new EventEmitter();

  form : FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      file: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.form.valueChanges.subscribe(({ file } : ImportFormat) => {
      if(!file) return;
      
    });
  }

  submit() {
    this.import.emit(this.form.value);
  }

  get file() { 
    return this.form.get('file')?.value as File; 
  }

}
