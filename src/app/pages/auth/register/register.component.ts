import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RegisterService } from './register.service';

@Component({
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private register: RegisterService
  ) {
    this.form = this.fb.group({
      email: [""],
      password: [""],
      confirmPassword: [""]
    });
  }

  login() {
    let data = this.form.value;
    // this.register.signWithEmailAndPassword(data.email, data.password);
  }
}
