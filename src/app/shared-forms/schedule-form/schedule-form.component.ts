import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { pickerTheme } from '../submenu-form/picker-theme';

@Component({
  selector: 'app-schedule-form',
  templateUrl: './schedule-form.component.html',
  styleUrl: './schedule-form.component.scss'
})
export class ScheduleFormComponent implements OnChanges {

  @Input() edit: boolean = false;

  form: FormGroup;
  pickerTheme = pickerTheme;

  constructor(
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      openingHour: [''],
      closingHour: [''],
    });
    this.form.disable();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['edit'])
      if(this.edit){
        this.form.enable();
      } else {
        this.form.disable();
      }
  }

}
