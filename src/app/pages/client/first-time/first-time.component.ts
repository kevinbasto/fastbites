import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth.service';
import { plans } from '../../../../environments/plans';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { FirstTimeService } from './first-time.service';
import { Plan } from '../../../core/entities/plan';

@Component({
  selector: 'app-first-time',
  templateUrl: './first-time.component.html',
  styleUrl: './first-time.component.scss'
})
export class FirstTimeComponent implements OnInit {
  
  plans? : Array<Plan>

  personalDataForm?: FormGroup;
  planForm?: FormGroup;
  cardForm?: FormGroup;

  constructor(
    private firstTimeService: FirstTimeService,
    
  ) {
    
  }

  ngOnInit(): void {
    this.firstTimeService.fetchPlans()
    .then((plans) => {
      console.log(plans)
      this.plans = plans;
    });
  }

  setPersonalDataForm(form: FormGroup) {
    this.personalDataForm = form;
  }

  setPlanForm(form: FormGroup) {
    this.planForm = form;
  }

  setCardForm(form: FormGroup) {
    this.cardForm = form;
  }

  saveForm() {}
}
