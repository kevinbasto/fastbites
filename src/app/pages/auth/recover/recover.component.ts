import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RecoverService } from './recover.service';

@Component({
  templateUrl: './recover.component.html',
  styleUrl: './recover.component.scss'
})
export class RecoverComponent {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private recoverService: RecoverService
  ) {
    this.form = this.fb.group({
      email: [""],
    });
  }

  login() {
    let data = this.form.value;
    this.recoverService
  }
}
