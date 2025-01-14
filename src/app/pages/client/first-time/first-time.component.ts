import { Component, OnInit } from '@angular/core';
import { FirstTimeService } from './first-time.service';
import { Plan } from '../../../core/entities/plan';
import { FormGroup } from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-first-time',
  templateUrl: './first-time.component.html',
  styleUrl: './first-time.component.scss'
})
export class FirstTimeComponent implements OnInit {
  
  plans? : Array<Plan>;
  uploading: boolean = false;

  personalDataForm?: FormGroup;
  planForm?: FormGroup;
  cardForm?: FormGroup;

  constructor(
    private firstTimeService: FirstTimeService,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.firstTimeService.fetchPlans()
    .then((plans) => {
      this.plans = plans;
    });
    this.auth.getEmail()
    .then((email: string) => this.personalDataForm?.get("email")?.setValue(email));
  }

  saveNewUser() {
    const profile = this.personalDataForm?.getRawValue();
    const plan = this.planForm?.value;
    const card = this.cardForm?.value;
    this.uploading = true;
    console.log(JSON.stringify({customer: profile, plan, card}, null, 2))
    this.firstTimeService.postNewProfile({profile, plan, card})
    .then((result) => {
      this.router.navigate(['/client/menu']);
    }).catch((err) => {
      
    })
    .finally(() => {
      this.uploading = false;
    });
  }
}
