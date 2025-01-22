import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { pickerTheme } from '../submenu-form/picker-theme';
import { Schedule } from '../../core/entities/schedule'; 

@Component({
  selector: 'schedule-form',
  templateUrl: './schedule-form.component.html',
  styleUrl: './schedule-form.component.scss'
})
export class ScheduleFormComponent implements OnChanges {

  @Input() uploading?: boolean;
  @Input() schedule?: Schedule;

  @Output() cancel: EventEmitter<null> = new EventEmitter()
  @Output() submitProduct : EventEmitter<Schedule> = new EventEmitter();

  form: FormGroup;
  pickerTheme = pickerTheme;

  constructor(
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      openingHour: ['', [Validators.required]],
      closingHour: ['', [Validators.required]],
      available: [],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['schedule'] && this.schedule){
      const { openingHour, closingHour, available } = this.schedule;
      this.form.setValue({ openingHour, closingHour, available });
    }
  }

  submit() {
    this.submitProduct.emit({...this.schedule, ...this.form.value});
  }

}
