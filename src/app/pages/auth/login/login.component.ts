import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  form: FormGroup;
  uploading : boolean = false;
  hide: boolean = true;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService
  ) {
    this.form = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]]
    });
  }

  login() {
    let data = this.form.value;
    this.uploading = true;
    this.loginService.signWithEmailAndPassword(data.email, data.password)
    .finally(() => this.uploading = false);
  }

  
  get email() {
    return this.form.get("email") as FormControl;
  }

  get password() {
    return this.form.get("password") as FormControl;
  }
}
