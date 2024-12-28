import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-first-time',
  templateUrl: './first-time.component.html',
  styleUrl: './first-time.component.scss'
})
export class FirstTimeComponent {
  
  personalDataForm : FormGroup;
  plans : Array<any> = [1,2,3]

  constructor(
    private fb : FormBuilder
  ) {
    this.personalDataForm = this.fb.group({
      name: ["", []],
      email: ["", [Validators.required, Validators.email]],
      phone: ["", []]
    });
  }

}
