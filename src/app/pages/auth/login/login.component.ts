import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService
  ) {
    this.form = this.fb.group({
      email: [""],
      password: [""]
    });
  }

  login() {
    let data = this.form.value;
    this.loginService.signWithEmailAndPassword(data.email, data.password);
  }
}
