import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth.service';
import { plans } from '../../../../environments/plans';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-first-time',
  templateUrl: './first-time.component.html',
  styleUrl: './first-time.component.scss'
})
export class FirstTimeComponent {
  
  personalDataForm : FormGroup;
  planForm: FormGroup;
  cardForm: FormGroup;
  
  plans : Array<any> = plans
  startDate?: Date;
  endDate?: Date
  constructor(
    private fb : FormBuilder,
    private authService: AuthService
  ) {
    this.personalDataForm = this.fb.group({
      name: ["Kevin Daniel Basto Anquino", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      phone: ["9995285247", []]
    });
    this.personalDataForm.get("email")?.disable();
    this.authService.getEmail()
    .then((email : string) => {
      this.personalDataForm.get("email")?.setValue(email);
    });

    this.planForm = this.fb.group({
      plan: ['', [Validators.required]],
      trial: ['', ]
    })

    this.cardForm = this.fb.group({
      name: ['', [Validators.required]],
      card: ['', [Validators.required]],
      creditOrDebit: ['', [Validators.required]],
      expMonth: ['', Validators.required],
      expYear: ['', [Validators.required]],
      cvc: ['', [Validators.required]]
    });
  }

  setTrial(plan: MatSlideToggleChange) {
    this.planForm.get("trial")!.setValue(plan.checked)
    this.startDate = new Date(Date.now());
    this.endDate = new Date(Date.now() + (15 * 24 * 60  * 60 * 1000))
  }
}
