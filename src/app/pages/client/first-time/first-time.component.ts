import { Component, OnInit } from '@angular/core';
import { FirstTimeService } from './first-time.service';
import { Plan } from '../../../core/entities/plan';
import { FormGroup } from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { Profile } from '../../../core/entities/profile';

@Component({
  selector: 'app-first-time',
  templateUrl: './first-time.component.html',
  styleUrl: './first-time.component.scss'
})
export class FirstTimeComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private firstTimeService: FirstTimeService,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.auth.getEmail()
    .then((email : string) => this.form.get("email")?.setValue(email));
  }


  saveNewUser(profile: Profile) {
    this.firstTimeService.postNewProfile(profile);
  }
}
