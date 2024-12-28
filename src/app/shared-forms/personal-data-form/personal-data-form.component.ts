import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Profile } from '../../core/entities/profile';

@Component({
  selector: 'personal-data-form',
  templateUrl: './personal-data-form.component.html',
  styleUrl: './personal-data-form.component.scss'
})
export class PersonalDataFormComponent implements OnChanges {

  @Input() enable: boolean = false;
  @Input() profile?: Profile;
  @Input() uploading?: boolean;
  @Output() cancelForm : EventEmitter<void> = new EventEmitter()
  @Output() personalData: EventEmitter<Profile> = new EventEmitter();

  @Input() form: FormGroup

  constructor(
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      name: ["", []],
      email: ["", [Validators.required, Validators.email]],
      phone: ["", []]
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['enable']){
      if(this.enable) this.form.enable() 
      else this.form.disable()
      this.email.disable();
    }

    if(changes['profile'] && this.profile){
      let { name, email, phone } = this.profile;
      if(name) this.name.setValue(name)
      if(email) this.email.setValue(email)
      if(phone) this.phone.setValue(phone)
    }
  }

  submitForm() {
    let data = this.form.getRawValue();
    this.personalData.emit(data);
  }

  get name() {
    return this.form.get("name")!;
  }

  get email() {
    return this.form.get("email")!;
  }

  get phone() {
    return this.form.get("phone")!;
  }

}
