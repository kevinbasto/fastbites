import {
    FormControl,
    FormGroup,
    FormGroupDirective,
    NgForm,
  } from '@angular/forms';
  import { ErrorStateMatcher } from '@angular/material/core';
  
  export class PasswordErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(
      control: FormControl | null,
      form: FormGroupDirective | NgForm | null
    ): boolean {
      let current = control!.value;
      let parentval = control!.parent!.get("password")!.value
  
      if(control!.touched && current != parentval)
        return true;
      
      return false;
    }
  }
  
  export const checkPasswords = (group: FormGroup) => {
    // here we have the 'passwords' group
    let pass = group.controls['password'].value;
    let confirmPass = group.controls['confirmPassword'].value;
  
    return pass === confirmPass ? null : { 'notSame': true };
  };
  
  export const passwordRegex: RegExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;