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
  

  constructor(
    private firstTimeService: FirstTimeService,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  
  }

  
  saveNewUser() {
  
  }
}
