import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-first-time',
  templateUrl: './first-time.component.html',
  styleUrl: './first-time.component.scss'
})
export class FirstTimeComponent {
  
  personalDataForm : FormGroup;
  plans : Array<any> = [1,2,3]

  constructor(
    private fb : FormBuilder,
    private authService: AuthService
  ) {
    this.personalDataForm = this.fb.group({
      name: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      phone: ["", []]
    });
    this.personalDataForm.get("email")?.disable();
    this.authService.getEmail()
    .then((email : string) => {
      this.personalDataForm.get("email")?.setValue(email);
    })
  }

}
