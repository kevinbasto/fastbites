import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from './register.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { checkPasswords, PasswordErrorStateMatcher } from './password-validation';

@Component({
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  form : FormGroup;
  hide: boolean = true;
  matcher : ErrorStateMatcher;

  @Input() uploading: boolean = false;
  

  constructor(
    private builder : FormBuilder,
    private registerService : RegisterService
  ) {
    
    this.form = this.builder.group({
      email : ["", [Validators.required, Validators.email]],
      password : ["", [Validators.required, /**Validators.pattern(passwordRegex) */]],
      confirmPassword : ["", [Validators.required]],
      terms : [false, [Validators.requiredTrue]],
    },  { validators : checkPasswords })
    this.matcher  = new PasswordErrorStateMatcher();
  }

  get email() {
    return this.form.get("email") as FormControl;
  }

  get password() {
    return this.form.get("password") as FormControl;
  }

  get confirmPassword() {
    return this.form.get("confirmPassword") as FormControl
  }

  submit() {
    let {email, password, terms} = this.form.value as any;
    this.registerService.registerWithEmailAndPassword(email, password, terms)
  }
}
