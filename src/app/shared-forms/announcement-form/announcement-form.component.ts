import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Announcement } from '../../core/entities/announcement';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'announcement-form',
  templateUrl: './announcement-form.component.html',
  styleUrl: './announcement-form.component.scss'
})
export class AnnouncementFormComponent implements OnChanges {

  @Input() uploading? : boolean;
  @Input() announcement?: Announcement;

  @Output() cancel: EventEmitter<void> = new EventEmitter();
  @Output() submitAnnouncement: EventEmitter<Partial<Announcement>> = new EventEmitter();

  form: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      message: ['', [Validators.required]],
      available: [true],
      startDate: ['', [Validators.required]],
      endDate: ['']
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['announcement'] && this.announcement){
      const {name, message, available, startDate, endDate} = this.announcement;
      this.form.setValue({name, message, available, startDate, endDate});
    }
  }

  cancelForm() {
    this.cancel.emit()
  }

  submitForm() {
    this.submitAnnouncement.emit({...this.announcement, ...this.form.value});
  }

}
